

const Accordion = () => {
    return (
        <div className="mb-10">
            <h2 className="mt-10 text-xl font-bold p-2 rounded-sm text-teal-400 bg-white border border-teal-400 md:w-1/3">Q & A section</h2>
            <div className="collapse collapse-arrow bg-base-200 my-5">
                <input type="radio" name="my-accordion-2" checked="checked" />
                <div className="collapse-title text-lg font-medium">
                Are your services available throughout the country?
                </div>
                <div data-aos="fade-right" data-aos-duration="2000"  className="collapse-content  ">
                    <p>Yes, We we have different service provider throughout the country.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-lg font-medium">
                    Have you service products that can i buy from home?
                </div>
                <div  className="collapse-content">
                    <p>Yes,You can buy our products from home.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 my-5">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-lg font-medium">
                    Is there any installment policy to pay?
                </div>
                <div className="collapse-content">
                    <p>If you have credit card,you can pay with in 3 installment with 0% interest.</p>
                </div>
            </div>
        </div>
    );
};

export default Accordion;