import React, { useState, useEffect } from 'react'

const GenerateImage = () => {
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!description) return

        const generateImage = async () => {
            setLoading(true)
            setError(null)
            setImage(null)

            const res = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer <API_KEY>',
                },
                body: JSON.stringify({
                    model: 'image-alpha-001',
                    prompt: description,
                }),
            })

            if (!res.ok) {
                setError(await res.text())
                setLoading(false)
                return
            }

            const data = await res.json()
            setImage(data.data[0].url)
            setLoading(false)
        }

        generateImage()
    }, [description])

    return (
        <div>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
            <button onClick={() => setDescription(description)}>Submit</button>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : image ? (
                <img src={image} alt="Generated Image" />
            ) : (
                <p>Enter a description to generate an image</p>
            )}
        </div>
    )
}

export default GenerateImage
