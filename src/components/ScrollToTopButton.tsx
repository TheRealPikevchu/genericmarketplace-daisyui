import React, { useState, useEffect } from 'react'

const ScrollToTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                setShowTopBtn(true)
            } else {
                setShowTopBtn(false)
            }
        })
    }, [])

    const goToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div>
            {showTopBtn && (
                <button
                    className="fixed right-4 bottom-8 btn bg-orange-500 border-orange-400 text-white rounded-full material-symbols-outlined transparent"
                    onClick={goToTop}
                >
                    arrow_upward
                </button>
            )}
        </div>
    )
}

export default ScrollToTop
