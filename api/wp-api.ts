import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.WP_GRAPHQL || '',
  cache: new InMemoryCache(),
})

export function getSiteMeta() {
  return client.query({
    query: gql`
      query getSiteMeta {
        generalSettings {
          title
          description
        }
      }
    `,
  })
}

export function getLocations() {
  return client.query({
    query: gql`
      query getLocations {
        locations(where: { parent: 0 }, first: 100) {
          nodes {
            name
            children {
              nodes {
                name
              }
            }
          }
        }
      }
    `,
  })
}

export function getCategories() {
  return client.query({
    query: gql`
      query getCategories {
        categories(first: 100) {
          nodes {
            name
            databaseId
          }
        }
      }
    `,
  })
}

export function getPropertyByStatustag(statustag: string) {
  return client.query({
    variables: {
      statustag: statustag,
    },
    query: gql`
      query getPropertyByStatustag($statustag: String!) {
        properties(where: { statustag: $statustag }) {
          nodes {
            title
            slug
            property_info {
              statustag
              price
            }
            property_features {
              bedrooms
              bathrooms
              housesize
            }
            locations {
              nodes {
                name
                slug
                ancestors {
                  nodes {
                    name
                    slug
                  }
                }
              }
            }
            attachedMedia(first: 1) {
              nodes {
                sourceUrl
                slug
              }
            }
          }
        }
      }
    `,
  })
}

export function getProperties() {
  return client.query({
    query: gql`
      query getAllPropiedades {
        properties {
          nodes {
            title
            slug
            property_features {
              bathrooms
              bedrooms
            }
            property_info {
              price
              statustag
            }
            attachedMedia(first: 1) {
              nodes {
                sourceUrl
                title
              }
            }
            locations {
              nodes {
                name
              }
            }
          }
        }
      }
    `,
  })
}

export function getPropertyBySlug(slug: string) {
  return client.query({
    variables: {
      slug: slug,
    },
    query: gql`
      query getPropertyBySlug($slug: ID!) {
        property(id: $slug, idType: SLUG) {
          title
          slug
          property_info {
            statustag
            price
            featured
          }
          property_features {
            bathrooms
            bedrooms
            commentArea
            housesize
            yearbuilt
          }
          features {
            nodes {
              name
              slug
            }
          }
          attachedMedia {
            nodes {
              sourceUrl
              title
              slug
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          locations(where: { childless: true }) {
            nodes {
              name
              slug
              ancestors {
                nodes {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    `,
  })
}
