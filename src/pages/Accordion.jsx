

const Accordion = () => {
    return (
        <div className="mb-10">
            <h2 className="mt-10 text-xl font-bold p-2 rounded-sm text-black bg-white border border-teal-400 md:w-2/4">Common Questions & Answers</h2>
            <div className="collapse collapse-arrow bg-base-200 my-5">
                <input type="radio" name="my-accordion-2" checked="checked" />
                <div className="collapse-title text-xl font-medium">
                Are your services available throughout the country?
                </div>
                <div data-aos="fade-right" data-aos-duration="2000"  className="collapse-content  ">
                    <p>Yes, We cover 64 district with our services.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    Can we pay with bank card?
                </div>
                <div  className="collapse-content">
                    <p>Yes,we accept any kind of bank card.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 my-5">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
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