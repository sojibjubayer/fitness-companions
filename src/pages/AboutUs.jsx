

const AboutUs=()=> {
  return (
    <section className="bg-gray-100 p-8 md:p-16">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mr-4">
          <h2 className="text-2xl text-teal-400 md:text-xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to our fitness website! We are dedicated to helping you achieve your fitness goals and lead a healthier, more active lifestyle. Our team of experienced trainers and nutritionists is here to guide you on your fitness journey.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            At our fitness center, we offer a wide range of services, including personalized workout plans, group fitness classes, nutritional counseling, and more. Whether you are a beginner or an experienced athlete, we have something for everyone.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Our mission is to inspire and motivate you to reach your full potential. We believe that a healthy body leads to a happier life, and we are committed to providing you with the support and resources you need to succeed.
          </p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img src="https://i.ibb.co/KKLPGDF/fit1.webp" alt="Fitness Center" className="w-full h-auto rounded-lg" />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
