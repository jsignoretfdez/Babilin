CREATE TABLE IF NOT EXISTS programmings (
    id SERIAL PRIMARY KEY,
    classroom VARCHAR(50) NOT NULL,
    month VARCHAR(20) NOT NULL,
    year INTEGER NOT NULL,
    pdf_path VARCHAR(255),
    extracted_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
