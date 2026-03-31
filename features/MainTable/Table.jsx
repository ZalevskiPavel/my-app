"use client";
import { useEffect, useState } from "react";
import styles from "./table-style.module.css";
import MainForm from "./MainForm/MainForm.jsx"
import { Bellefair, Montserrat } from "next/font/google";
import Note from "../../components/Note/Note";
import FilterModal from "./FilterModalWindow/FIlterModal"

const bellefair = Bellefair({
    subsets: ["latin"],
    weight: "400",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: "400",
});


export default function Home() {
    const [proiecte, setProiecte] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [filters, setFilters] = useState({
        field: "nume",
        value: ""
    });

    useEffect(() => {
        const data = localStorage.getItem("proiecte");
        if (data) setProiecte(JSON.parse(data));
    }, []);

    function saveToStorage(data) {
        setProiecte(data);
        localStorage.setItem("proiecte", JSON.stringify(data));
    }

    function handleAdd() {
        setEditIndex(null);
        setIsOpen(true);
    }

    function handleEdit(index) {
        setEditIndex(index);
        setIsOpen(true);
    }

    function handleDelete(index) {
        const updated = proiecte.filter((_, i) => i !== index);
        saveToStorage(updated);
    }

    function handleSubmit(formData) {
        let updated;

        if (editIndex !== null) {
            updated = [...proiecte];
            updated[editIndex] = formData;
        } else {
            updated = [...proiecte, formData];
        }

        saveToStorage(updated);
        setIsOpen(false);
    }

    const filteredProiecte = proiecte.filter(p => {
        if (!filters.value) return true;

        const val = p[filters.field]?.toString().toLowerCase();

        return val.includes(filters.value.toLowerCase());
    });

    function handleApplyFilter(newFilter) {
        setFilters(newFilter);
    }

    return (
        <div className={styles.container}>
            <h2 className={bellefair.className}>Proiecte</h2>

            <div className={styles.header_buttons}>
                <button className={styles.addBtn} onClick={handleAdd}>
                    Add Proiect
                </button>
                <button onClick={() => setIsFilterOpen(true)} className={styles.addBtn}>
                    Filter
                </button>
                <button
                    disabled={!filters.value}
                    className={styles.addBtn}
                    onClick={() => setFilters({ field: "nume", value: "" } ) }
                >
                    Reset Filter
                </button>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr className={montserrat.className}>
                        <th>ID</th>
                        <th>Nume</th>
                        <th>Status</th>
                        <th>Descrierea</th>
                        <th>Deadline</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {filteredProiecte.map((p) => (
                        <Note
                            key={p.id}
                            proiect={p}
                            onClickEdit={() => handleEdit(proiecte.indexOf(p))}
                            onClickDelete={() => handleDelete(proiecte.indexOf(p))}
                        />
                    ))}
                </tbody>
            </table>

            {isOpen && (
                <MainForm
                    onClose={() => setIsOpen(false)}
                    onSubmit={handleSubmit}
                    initialData={editIndex !== null ? proiecte[editIndex] : null}
                />
            )}
            {isFilterOpen && (
                <FilterModal
                    onClose={() => setIsFilterOpen(false)}
                    onApply={handleApplyFilter}
                />
            )}
        </div>
    );
}