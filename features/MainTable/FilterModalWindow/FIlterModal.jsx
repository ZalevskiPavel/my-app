"use client";
import { useState } from "react";
import styles from "./filter-modal-styles.module.css";
import { Bellefair, Montserrat } from "next/font/google";

const bellefair = Bellefair({
    subsets: ["latin"],
    weight: "400",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: "400",
});


export default function FilterModal({ onClose, onApply }) {
    const [field, setField] = useState("nume");
    const [value, setValue] = useState("");

    function handleApply() {
        onApply({ field, value });
        onClose();
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal} >
                <h3 className={bellefair.className}>FILTER PROIECTE</h3>

                <div className={styles.group}>
                    <label className={bellefair.className}>Field</label>
                    <select className={montserrat.className} value={field} onChange={(e) => setField(e.target.value)}>
                        <option value="nume">Nume</option>
                        <option value="status">Status</option>
                        <option value="deadline">Deadline</option>
                    </select>
                </div>

                <div className={styles.group}>
                    <label className={bellefair.className}>Value</label>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>

                <div className={styles.buttons}>
                    <button onClick={handleApply} className={styles.btn}>Apply</button>
                    <button onClick={onClose} className={styles.btn}>Cancel</button>
                </div>
            </div>
        </div>
    );
}