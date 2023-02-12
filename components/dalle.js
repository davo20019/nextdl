import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'

const Index = () => {
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState(null)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        const res = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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',
            },
            body: JSON.stringify({
                model: 'image-alpha-001',
                prompt: description,
            }),
        })

        console.log(await res.json())

        if (!res.ok) {
            setError(res.statusText)
            return
        }

        const data = await res.json()
        if (!data.data) {
            setError('Error: Invalid response from API')
            return
        }

        setImageUrl(data.data[0].url)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                <button type="submit">Generate Image</button>
            </form>
            {error ? (
                <p>{error}</p>
            ) : imageUrl ? (
                <img src={imageUrl} />
            ) : (
                <p>Enter a description to generate an image:::::</p>
            )}
        </div>
    )
}

export default Index
