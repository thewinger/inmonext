
type Property = {
  property: Property;
};

const PropertyCard = ({ property }: Property) => {
  return (
    <div className="w- mb-24 mt-6 border-2 border-white bg-white/90 p-4 backdrop-blur-md">
        { JSON.stringify(property) }
    </div>
  )
}

export default PropertyCard
