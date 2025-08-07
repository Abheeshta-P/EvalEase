// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const FeedbackFormViewer = () => {
//   const { id } = useParams(); // form id from route
//   const navigate = useNavigate();
//   const [form, setForm] = useState(null);
//   const [answers, setAnswers] = useState({});

//   useEffect(() => {
//     fetch(`http://localhost:8080/api/forms/${id}`)
//       .then(res => res.json())
//       .then(data => setForm(data))
//       .catch(err => console.error('Failed to load form', err));
//   }, [id]);

//   const handleChange = (questionId, value) => {
//     setAnswers(prev => ({ ...prev, [questionId]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       formId: id,
//       responses: answers,
//       submittedAt: new Date().toISOString()
//     };

//     try {
//       const res = await fetch(`http://localhost:8080/api/responses`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       if (!res.ok) throw new Error('Failed to submit');

//       alert('Feedback submitted successfully!');
//       navigate('/employee/dashboard');
//     } catch (err) {
//       alert('Failed to submit response');
//       console.error(err);
//     }
//   };

//   if (!form) return <div className="p-6">Loading form...</div>;

//   return (
//     <div className="max-w-3xl mx-auto px-6 py-10">
//       <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
//       {form.description && <p className="mb-6 text-gray-600">{form.description}</p>}
//       <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border shadow-sm">
//         {form.questions.map((q, i) => (
//           <div key={q.id}>
//             <label className="block text-gray-700 font-medium mb-1">
//               {i + 1}. {q.title} {q.required && <span className="text-red-500">*</span>}
//             </label>

//             {q.type === 'text' && (
//               <input
//                 type="text"
//                 required={q.required}
//                 className="w-full border rounded-md p-2"
//                 onChange={e => handleChange(q.id, e.target.value)}
//               />
//             )}

//             {q.type === 'textarea' && (
//               <textarea
//                 required={q.required}
//                 className="w-full border rounded-md p-2"
//                 rows={4}
//                 onChange={e => handleChange(q.id, e.target.value)}
//               />
//             )}

//             {q.type === 'rating' && (
//               <div className="flex space-x-2">
//                 {[...Array(q.ratingScale)].map((_, i) => (
//                   <label key={i} className="flex items-center space-x-1">
//                     <input
//                       type="radio"
//                       name={`rating-${q.id}`}
//                       value={i + 1}
//                       onChange={() => handleChange(q.id, i + 1)}
//                       required={q.required}
//                     />
//                     <span>{i + 1}</span>
//                   </label>
//                 ))}
//               </div>
//             )}

//             {q.type === 'multiple' && (
//               <div className="space-y-1">
//                 {q.options.map((opt, idx) => (
//                   <label key={idx} className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name={`multi-${q.id}`}
//                       value={opt}
//                       required={q.required}
//                       onChange={() => handleChange(q.id, opt)}
//                     />
//                     <span>{opt}</span>
//                   </label>
//                 ))}
//               </div>
//             )}

//             {q.type === 'checkbox' && (
//               <div className="space-y-1">
//                 {q.options.map((opt, idx) => (
//                   <label key={idx} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       onChange={e => {
//                         const prev = answers[q.id] || [];
//                         const updated = e.target.checked
//                           ? [...prev, opt]
//                           : prev.filter(o => o !== opt);
//                         handleChange(q.id, updated);
//                       }}
//                     />
//                     <span>{opt}</span>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           Submit Feedback
//         </button>
//       </form>
//     </div>
//   );
// };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     formId: id,
  //     responses: answers,
  //     submittedAt: new Date().toISOString()
  //   };

  //   try {
  //     const res = await fetch(`http://localhost:8080/api/responses`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(payload)
  //     });

  //     if (!res.ok) throw new Error('Failed to submit');

  //     alert('Feedback submitted successfully!');
  //     navigate('/employee/dashboard');
  //   } catch (err) {
  //     alert('Failed to submit response');
  //     console.error(err);
  //   }
  // };

// export default FeedbackFormViewer;
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FeedbackFormViewer = () => {
  const { id } = useParams(); // form id from route
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8080/api/forms/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched Form:', data); // Debug log
        setForm(data);
      })
      .catch(err => console.error('Failed to load form', err));
  }, [id]);

  const handleChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = {
    formId: id,
    responses: answers,
    submittedAt: new Date().toISOString(),
    employeeId: localStorage.getItem('employeeId')  // <-- Add this line
  };

  try {
    const res = await fetch(`http://localhost:8080/api/responses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Failed to submit');

    alert('Feedback submitted successfully!');
    navigate('/employee/dashboard');
  } catch (err) {
    alert('Failed to submit response');
    console.error(err);
  }
};



  if (!form) {
    return <div className="p-6">Loading form...</div>;
  }

  if (!Array.isArray(form.questions) || form.questions.length === 0) {
    return <div className="p-6">No questions found in this form.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
      {form.description && <p className="mb-6 text-gray-600">{form.description}</p>}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border shadow-sm">
        {form.questions.map((q, i) => (
          <div key={q.id || i}>
            <label className="block text-gray-700 font-medium mb-1">
              {i + 1}. {q.title} {q.required && <span className="text-red-500">*</span>}
            </label>

            {q.type === 'text' && (
              <input
                type="text"
                required={q.required}
                className="w-full border rounded-md p-2"
                onChange={e => handleChange(q.id, e.target.value)}
              />
            )}

            {q.type === 'textarea' && (
              <textarea
                required={q.required}
                className="w-full border rounded-md p-2"
                rows={4}
                onChange={e => handleChange(q.id, e.target.value)}
              />
            )}

            {q.type === 'rating' && q.ratingScale && (
              <div className="flex space-x-2">
                {[...Array(q.ratingScale)].map((_, idx) => (
                  <label key={idx} className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name={`rating-${q.id}`}
                      value={idx + 1}
                      onChange={() => handleChange(q.id, idx + 1)}
                      required={q.required}
                    />
                    <span>{idx + 1}</span>
                  </label>
                ))}
              </div>
            )}

            {q.type === 'multiple' && Array.isArray(q.options) && (
              <div className="space-y-1">
                {q.options.map((opt, idx) => (
                  <label key={idx} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`multi-${q.id}`}
                      value={opt}
                      required={q.required}
                      onChange={() => handleChange(q.id, opt)}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {q.type === 'checkbox' && Array.isArray(q.options) && (
              <div className="space-y-1">
                {q.options.map((opt, idx) => (
                  <label key={idx} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      onChange={e => {
                        const prev = answers[q.id] || [];
                        const updated = e.target.checked
                          ? [...prev, opt]
                          : prev.filter(o => o !== opt);
                        handleChange(q.id, updated);
                      }}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackFormViewer;
