import Product from "./Product";

const dummyProduct = [
    {
        id: "IGP001",
        name: "Quantum Hyperdrive Engine",
        image:"https://i.ibb.co/zGry7sT/Quantum-Hyperdrive-Engine.jpg",
        price: 9999.99,
        tags: ["technology", "spacecraft", "engine"],
        description:
            "Revolutionize your spacecraft's propulsion system with the Quantum Hyperdrive Engine. Utilizing cutting-edge quantum mechanics, this engine offers unprecedented speed and efficiency, allowing you to traverse vast interstellar distances in record time. Say goodbye to conventional propulsion methods and embrace the future of space travel.",
    },
    {
        id: "IGP002",
        name: "Stellarium Holographic Star Map",
        image:"https://i.ibb.co/Qv8DfX5/Stellarium-Holographic-Star-Map.jpg",
        price: 499.5,
        tags: ["navigation", "astronomy", "technology"],
        description:
            "Navigate the cosmos with ease using the Stellarium Holographic Star Map. This advanced navigational tool projects a detailed three-dimensional map of nearby star systems, helping you plot courses and avoid hazards. Whether you're a seasoned explorer or a novice pilot, the Stellarium Star Map is an essential companion for safe and efficient intergalactic travel.",
    },
    {
        "id": "IGP003",
        "name": "Galactic Translator Device",
        image: "https://i.ibb.co/swy7yJ5/Galactic-Translator-Device.jpg",
        "price": 199.99,
        "tags": ["communication", "language", "technology"],
        "description": "Break down language barriers across the cosmos with the Galactic Translator Device. This compact handheld device instantly translates speech and text into over 1,000 galactic languages, ensuring seamless communication with alien species and fellow travelers. Whether negotiating trade deals or making new friends, the Galactic Translator Device is your key to unlocking the secrets of the universe."
      }      
];

const Products = () => {
    return (
        <div className=" p-3 lg:p-10">
            <div className=" grid lg:grid-cols-3 grid-cols-1 gap-3">
                {
                    dummyProduct.map((product) => (
                        <Product key={product.id} product={product} />
                    ))
                }
            </div>
            
        </div>
    );
};

export default Products;