import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

export const ContactUs = () => {
  const refForm = useRef();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "El nombre es requerido";
      isValid = false;
    }

    if (!formData.email) {
      tempErrors.email = "El email es requerido";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email inválido";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "El mensaje es requerido";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "El mensaje debe tener al menos 10 caracteres";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus(null);

      const serviceId = "service_94y4r7r";
      const templateId = "template_simv6lu";
      const publicKey = "WNjrt0evVAEnj7eFH";

      emailjs.sendForm(serviceId, templateId, refForm.current, publicKey)
        .then(() => {
          setSubmitStatus('success');
          setFormData({
            name: '',
            email: '',
            message: ''
          });
          refForm.current.reset();
        }, (error) => {
          setSubmitStatus('error');
          console.error('Error al enviar el correo:', error.text);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div className="contact-form-container">
      {submitStatus === 'success' && (
        <div className="bg-emerald-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          ¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          Hubo un problema en el envio de tu mensaje. Por favor intentalo nuevamente.
        </div>
      )}

      <form
        ref={refForm}
        onSubmit={handleSubmit}
        className="w-[28rem] mx-auto p-6 bg-white shadow-xl rounded-xl space-y-6 mt-20"
      >
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-800'>Contact Us</h2>
          <p className='text-sm text-gray-500'>Please Fill This Form</p>
        </div>

        <fieldset className='flex flex-col gap-2'>
          <label htmlFor="name" className='text-sm font-medium text-gray-700'>Name</label>
          <input
            name='name'
            type="text"
            placeholder='Ejemplo: Miguel Chilito'
            required
            value={formData.name}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400'
          />
          {errors.name && <span className="text-red-600 text-sm">{errors.name}</span>}
        </fieldset>

        <fieldset className='flex flex-col gap-2'>
          <label htmlFor="email" className='text-sm font-medium text-gray-700'>Email</label>
          <input
            name='email'
            type="email"
            placeholder='Ejemplo miguelngelchilito@gmail.com'
            required
            value={formData.email}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400'
          />
          {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
        </fieldset>

        <fieldset className='flex flex-col gap-2'>
          <label htmlFor="message" className='text-sm font-medium text-gray-700'>Message</label>
          <textarea
            name='message'
            placeholder='Ejemplo: ¡Bienvenido!'
            required
            value={formData.message}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none'
            rows={4}
          />
          {errors.message && <span className="text-red-600 text-sm">{errors.message}</span>}
        </fieldset>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50 transition duration-200"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </form>
    </div>
  );
};
