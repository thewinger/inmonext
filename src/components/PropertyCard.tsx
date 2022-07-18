import { Property } from "../generated/graphql";

type Props = {
  property?: Property;
};

const PropertyCard = ({ property }: Props) => {
  return (
    <>
      {property && (
        <div className="w-full min-w-full rounded-md border-2 border-white bg-white/90 p-4 backdrop-blur-md">
          {property.title}
        </div>
      )}
    </>
  );
};

export default PropertyCard;
