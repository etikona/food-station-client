const Help = () => {
  return (
    <div className="my-20 mx-10">
      <div className="flex justify-around sm:flex-1">
        <div className="my-auto">
          <h3 className="text-4xl  text-yellow-500   font-thin font-lower">
            Help each other
          </h3>
          <p className="text-xl text-white text-start">
            Give your items a second life. Less waste = less damage to the{" "}
            <br />
            planet.Coalition of Partners To Prevent Food Waste And Food Loss.
          </p>
        </div>
        <div>
          <img
            className="rounded-lg"
            src="https://img.freepik.com/free-photo/person-being-donated-food_23-2148613181.jpg?t=st=1715382249~exp=1715385849~hmac=90f02571654263e567d29e789f52d67163f9fc4a986da087179623bf3b49c440&w=500"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Help;
