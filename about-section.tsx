export default function AboutSection() {
  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "200+", label: "Happy Clients" },
    { number: "10+", label: "Years Experience" },
    { number: "50+", label: "Team Members" }
  ];

  return (
    <section id="about" className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">About Agency</h2>
            <p className="text-lg text-neutral-900 mb-6">
              With over a decade of experience in the technology industry, Agency has been at the forefront of digital transformation, helping businesses leverage cutting-edge technologies to achieve their goals.
            </p>
            <p className="text-lg text-neutral-900 mb-8">
              Our team of expert engineers, designers, and consultants work collaboratively to deliver innovative solutions that drive growth, efficiency, and competitive advantage for our clients.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-neutral-900">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Modern office workspace with professionals" 
              className="rounded-xl shadow-lg w-full h-auto" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
