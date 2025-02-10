import React, { useState, useEffect, useRef } from 'react';
import { db, storage } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import './EditPlayer.css';

export function EditPlayer({ playerId, onClose }) {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [certificadoImage, setCertificadoImage] = useState(null);
    const fileInputRef = useRef(null);
    const certificadoInputRef = useRef(null);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const docRef = doc(db, "Players", playerId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFormData(docSnap.data());
                }
            } catch (error) {
                console.error("Error al obtener jugador:", error);
            }
        };

        if (playerId) {
            fetchPlayer();
        }
    }, [playerId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleCertificadoChange = (e) => {
        if (e.target.files[0]) {
            setCertificadoImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updateData = { ...formData };

            if (image) {
                if (formData.playerpic) {
                    try {
                        const oldImageRef = ref(storage, formData.playerpic);
                        await deleteObject(oldImageRef);
                    } catch (error) {
                        console.log("Error al borrar imagen antigua:", error);
                    }
                }

                const storageRef = ref(storage, `ppics/${Date.now()}_${image.name}`);
                const uploadResult = await uploadBytes(storageRef, image);
                updateData.playerpic = await getDownloadURL(uploadResult.ref);
            }

            if (certificadoImage) {
                if (formData.certificadoUrl) {
                    try {
                        const oldCertRef = ref(storage, formData.certificadoUrl);
                        await deleteObject(oldCertRef);
                    } catch (error) {
                        console.log("Error al borrar certificado antiguo:", error);
                    }
                }

                const certificadoRef = ref(storage, `certi/${Date.now()}_${certificadoImage.name}`);
                const uploadResult = await uploadBytes(certificadoRef, certificadoImage);
                updateData.certificadoUrl = await getDownloadURL(uploadResult.ref);
            }

            await updateDoc(doc(db, "Players", playerId), updateData);
            alert('Jugador actualizado exitosamente');
            onClose();
        } catch (error) {
            console.error("Error al actualizar jugador:", error);
            alert('Error al actualizar jugador');
        } finally {
            setLoading(false);
        }
    };

    if (!formData) return <div>Cargando...</div>;

    return (
        <div className="edit-modal">
            <div className="edit-content">
                <div className="edit-header">
                    <h2>Editar Jugador</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Apellido:</label>
                        <input
                            type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Cédula:</label>
                        <input
                            type="text"
                            name="cedula"
                            value={formData.cedula}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Género:</label>
                        <select
                            name="genero"
                            value={formData.genero}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione género</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Fecha de Nacimiento:</label>
                        <input
                            type="date"
                            name="fechaNacimiento"
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Nacionalidad:</label>
                        <input
                            type="text"
                            name="nacionalidad"
                            value={formData.nacionalidad}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Celular:</label>
                        <input
                            type="tel"
                            name="celular"
                            value={formData.celular}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contacto de Emergencia:</label>
                        <input
                            type="text"
                            name="contactoEmergencia"
                            value={formData.contactoEmergencia}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Teléfono de Emergencia:</label>
                        <input
                            type="tel"
                            name="telefonoEmergencia"
                            value={formData.telefonoEmergencia}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Alergias:</label>
                        <textarea
                            name="alergias"
                            value={formData.alergias}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Condición Médica:</label>
                        <textarea
                            name="condicionMedica"
                            value={formData.condicionMedica}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Certificación WFDF:</label>
                        <select
                            name="certificacionWFDF"
                            value={formData.certificacionWFDF}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione certificación</option>
                            <option value="standard">Standard</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Actualizar Certificado:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleCertificadoChange}
                            ref={certificadoInputRef}
                        />
                        {formData.certificadoUrl && (
                            <img 
                                src={formData.certificadoUrl} 
                                alt="Certificado actual" 
                                className="preview-image"
                            />
                        )}
                    </div>

                    <div className="form-group">
                        <label>Actualizar Foto:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                        />
                        {formData.playerpic && (
                            <img 
                                src={formData.playerpic} 
                                alt="Foto actual" 
                                className="preview-image"
                            />
                        )}
                    </div>

                    <div className="form-actions">
                        <button type="submit" disabled={loading}>
                            {loading ? 'Actualizando...' : 'Actualizar'}
                        </button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
} 