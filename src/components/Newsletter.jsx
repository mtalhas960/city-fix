import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Newsletter = () => {
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isSubmitting } 
  } = useForm();

  const onSubmit = async (data) => {
    // In future when we will create backend we will make api request here
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Successfully subscribed!');
      reset();
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  return (
    <section className="py-16 bg-white/90 backdrop-filter backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-semibold text-3xl md:text-4xl text-darkGray mb-4">Stay Updated</h2>
          <p className="text-darkGray/80 mb-8">Subscribe to our newsletter to get updates on new features, city partnerships, and success stories.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pb-3">
            <div className="flex-1 relative">
              <input 
                {...register("email", { 
                  required: "Email is required", 
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email" 
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#9333ea]'} focus:outline-none focus:ring-2 focus:border-[#9333ea] shadow-md hover:shadow-lg transition-shadow duration-300`}
              />
              {errors.email && (
                <p className="absolute top-full text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <button 
              type="submit" 
              className="btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          <p className="mt-4 text-sm text-darkGray/60">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
