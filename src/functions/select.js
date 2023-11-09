// import React, { useState } from 'react';
// import location from '../components/localidades.json'

// export default function MenuComponent(api) {
//     const [valorSeleccionado, setValorSeleccionado] = useState('Buenos aires');
//     const seleccion = (e) => {
//         const valor = e.target.value;
//         setValorSeleccionado(valor);
//     };

//     return (
//         <div>

//             {api && (
//                 <select className="ciudad" onChange={seleccion}>
//                     {Object.keys(location).map((ciudad) => (
//                         <option key={ciudad} value={ciudad}>
//                             {ciudad}
//                         </option>
//                     ))}
//                 </select>
//             )}
//         </div>
//     );
// }
