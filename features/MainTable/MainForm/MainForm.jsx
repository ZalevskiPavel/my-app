"use client"
import { useState, useEffect } from "react";
import styles from "./main-form-styles.module.css";
import { Bellefair, Montserrat } from "next/font/google";

const bellefair = Bellefair({
    subsets: ["latin"],
    weight: "400",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: "400",
});


export default function MainForm({ onClose, onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        id: "",
        nume: "",
        descriere: "",
        status: "nou",
        deadline: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) setFormData(initialData);
    }, [initialData]);

    function validate(data) {
        const err = {};

        if (!data.id.trim()) err.id = "ID obligatoriu";
        if (!data.nume.trim()) err.nume = "Numele este obligatoriu";
        if (!data.deadline) err.deadline = "Alege un deadline";

        return err;
    }

    function somethingChanged(e) {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function AddNewNote(e) {
        e.preventDefault();

        const validation = validate(formData);
        setErrors(validation);

        if (Object.keys(validation).length > 0) return;

        onSubmit(formData);
    }
    return (
        <div className={styles.overlay}>
            <div className={styles.formContainer}>
                <h2 className={bellefair.className}>{initialData ? "EDIT" : "ADD"} PROJECT</h2>

                <form className={bellefair.className} onSubmit={AddNewNote}>
                    <div className={styles.formGroup}>
                        <label>ID</label>
                        <input
                            value={formData.id}
                            type="text"
                            name="id"
                            required
                            className={montserrat.className}
                            onChange={somethingChanged} />
                        {errors.id && <span>{errors.id}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Nume</label>
                        <input
                            value={formData.nume}
                            type="text"
                            name="nume"
                            required
                            className={montserrat.className}
                            onChange={somethingChanged} />
                        {errors.nume && <span>{errors.nume}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Descriere</label>
                        <textarea
                            value={formData.descriere}
                            name="descriere"
                            className={montserrat.className}
                            onChange={somethingChanged}></textarea>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Status</label>
                        <select
                            value={formData.status}
                            name="status"
                            className={montserrat.className}
                            onChange={somethingChanged}>
                            <option value="Nou">Nou</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Finalizat">Finalizat</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Deadline</label>
                        <input
                            value={formData.deadline}
                            type="date"
                            name="deadline"
                            required
                            className={montserrat.className}
                            onChange={somethingChanged} />
                        {errors.deadline && <span>{errors.deadline}</span>}
                    </div>

                    <div className={styles.buttons}>
                        <button type="submit" className={styles.btn}>
                            Save
                        </button>
                        <button type="button" onClick={onClose} className={styles.btn}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

