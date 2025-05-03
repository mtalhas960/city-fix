import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset 
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Simulate sending data to server
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form data:', data);
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error(error);
    }
  };

  return (
    <section className="py-10">
      <div className="section-container">
        <div className="max-w-3xl mx-auto bg-primary/10 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 border border-white/20">
          <div>
            <div className="w-full relative">
              <h2 className="font-poppins font-semibold text-2xl md:text-3xl text-darkGray mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="form-group">
                  <label htmlFor="name" className="form-label block mb-2">
                    Name<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your full name"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                    } focus:outline-none focus:ring-2`}
                    {...register('name', { required: 'Please enter your name' })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label block mb-2">
                    Email<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your.email@example.com"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                    } focus:outline-none focus:ring-2`}
                    {...register('email', { 
                      required: 'Please enter your email',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label block mb-2">
                    Subject<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="What is this regarding?"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                    } focus:outline-none focus:ring-2`}
                    {...register('subject', { required: 'Please enter a subject' })}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label block mb-2">
                    Message<span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Your message here..."
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                    } focus:outline-none focus:ring-2`}
                    {...register('message', { required: 'Please enter your message' })}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary disabled:opacity-70 flex"
                  >
                    {isSubmitting ? (
                      <>
                        <span>Sending...</span>
                        <svg 
                          className="animate-spin ml-2 h-5 w-5" 
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none" 
                          viewBox="0 0 24 24"
                        >
                          <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path 
                            className="opacity-75" 
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;