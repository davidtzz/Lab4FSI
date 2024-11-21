import { Stripe} from 'stripe';
import ButtonCheckout from '../components/ButtonCheckout';

async function loadPrices(){
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const pricesData = await stripe.prices.list();
   
    //mapear los precios para incluir los nombres de los producto
    const pricesWithProductNames = await Promise.all(
        pricesData.data.map(async (price) =>{
            //Obtener los detalles del producto
            const product = await stripe.products.retrieve(price.product);
            return{
                id: price.id,
                unit_amount: price.unit_amount,
                currency: price.currency,
                productName: product.name,
                productImage: product.images[0] || null,
            };
        })
    );
    return pricesWithProductNames;
}


async function PricingPage() {
    const prices = await loadPrices();

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-[#d1d1d6] text-white py-4">
                <div className="container mx-auto flex items-center justify-center">
                    <img src="images/logo.png" alt="Logo" className="h-auto w-auto max-w-full max-h-20" />
                </div>
            </header>

            {/* Productos */}
            <main className="flex-grow bg-gray-100 py-8">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {prices.map((price) => (
                            <div
                                key={price.id}
                                className="bg-white shadow-lg rounded-lg p-6 text-center"
                            >
                                {price.productImage && (
                                    <div className="w-full h-40 flex justify-center items-center bg-gray-200 rounded mb-4">
                                        <img
                                            src={price.productImage}
                                            alt={price.productName}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                )}
                                <h3 className="text-lg font-medium mb-2">{price.productName}</h3>
                                <h2 className="text-2xl font-bold mb-4">
                                    {(price.unit_amount / 100).toFixed(2)}{' '}
                                    {price.currency.toUpperCase()}
                                </h2>
                                <ButtonCheckout priceId={price.id} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
export default PricingPage;