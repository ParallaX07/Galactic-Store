

const AllProductCard = () => {
    
        
    // {
    //     "Product_ID": "78610996-15f3-11ef-99fd-0242ac143902",
    //     "Name": "Stardust Necklace",
    //     "Description": "This exquisite necklace is crafted from the finest stardust particles collected from the rings of Zemora Prime. Each particle is meticulously selected and enchanted to emit a subtle, otherworldly glow that captivates the eyes of all who gaze upon it. Perfect for formal events or as a statement piece in your daily ensemble, the Stardust Necklace is a true testament to the beauty and mystery of the cosmos. Wear a piece of the universe around your neck and let your spirit shine as brightly as the stars.",
    //     "Price": 1200,
    //     "Galaxy_source": "Andromeda",
    //     "Planet_source": "Zemora Prime",
    //     "Quantity_inStock": 15,
    //     "Image_Url": "https://example.com/mediation.jpg"
    //     }

    return (
            <div className="flex flex-col">
                <img className="" src="https://example.com/mediation.jpg" alt="product" />
                <div className="flex flex-col form">
                    <p className="text-2xl">Stardust Necklace</p>
                    <p className="text-lg">Price: $1200</p>
                    <p className="text-lg">Galaxy: Andromeda</p>
                    <p className="text-lg">Planet: Zemora Prime</p>
                    <p className="text-lg">Quantity in Stock: 15</p>
                    <p className="text-lg">Description: This exquisite necklace is crafted from the finest stardust particles collected from the rings of Zemora Prime. Each particle is meticulously selected and enchanted to emit a subtle, otherworldly glow that captivates the eyes of all who gaze upon it. Perfect for formal events or as a statement piece in your daily ensemble, the Stardust Necklace is a true testament to the beauty and mystery of the cosmos. Wear a piece of the universe around your neck and let your spirit shine as brightly as the stars.</p>
                </div>
            </div>
    );
};

export default AllProductCard;