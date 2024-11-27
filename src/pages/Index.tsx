import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';
import { example_values, defaultFormData, questionTexts } from '../components/survey/constants';
import { useTypewriterEffect } from '../components/survey/TypewriterEffect';
import { kbz, aya, cb, uab, wave } from '../assets/images';
import ReviewSection from '../components/survey/ReviewSection';

const Index = () => {
    const [formData, setFormData] = useState({ ...defaultFormData });
    const [response, setResponse] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(-1);
    const { displayedText, typewriterDone, typewriterEffect } = useTypewriterEffect();

    useEffect(() => {
        if (currentQuestion === -1) {
            typewriterEffect("Welcome to Mobile Application Recommendation System");
        }
    }, [currentQuestion, typewriterEffect]);

    useEffect(() => {
        if (response) {
            typewriterEffect(`Recommended Mobile Application For You : ${response}`);
        }
    }, [response, typewriterEffect]);

    const handleYesNoChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleClick = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: parseInt(e.target.value)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://flask-server-qurj.onrender.com/predict', formData);
            setResponse(res.data['Mobile Payment Application']);
            toast.success('Successfully generated recommendation!');
        } catch (error) {
            toast.error('Error generating recommendation. Please try again.');
            console.error(error);
        }
    };

    const getButtonClass = (key, value) => {
        return formData[key] === value ;
    };

    const handleNext = () => {
        setCurrentQuestion(currentQuestion + 1);
    };

    const handleBack = () => {
        setCurrentQuestion(currentQuestion - 1);
    };

    const handleQuestionSelect = (index) => {
        setCurrentQuestion(index);
    };

    const handleQuestionClick = (index: number) => {
        setCurrentQuestion(index);
    };

    const questions = Object.keys(formData);
    const responseArray = response.split(" ");
    const imgName = responseArray[0]?.toLowerCase();

    const getImgSrc = () => {
        switch (imgName) {
            case "kbz": return kbz;
            case "aya": return aya;
            case "uab": return uab;
            case "cb": return cb;
            case "wave": return wave;
            default: return null;
        }
    };

    if (response) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
                <div className="container mx-auto px-4 py-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl font-bold text-primary mb-8">{displayedText}</h1>
                        <motion.img 
                            src={getImgSrc()}
                            alt={responseArray[0].toLowerCase()}
                            className="mx-auto rounded-xl shadow-xl mb-8 max-w-sm"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        />
                        <button
                            onClick={() => {
                                setFormData({ ...defaultFormData });
                                setResponse('');
                                setCurrentQuestion(-1);
                            }}
                            className="nav-button bg-white border-2 border-primary text-primary"
                        >
                            Take Test Again
                        </button>
                    </motion.div>
                </div>
            </div>
        );
    }

    if (currentQuestion === questions.length) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-8">
                <ReviewSection
                    questions={questions}
                    formData={formData}
                    onBack={() => setCurrentQuestion(questions.length - 1)}
                    onSubmit={handleSubmit}
                    onQuestionClick={handleQuestionClick}
                />
            </div>
        );
    }

    const isAnswered = (key) => {
        return formData[key] !== '' && formData[key] !== 'Select your age' && formData[key] !== 'Select your gender' && formData[key] !== 'Select your place of residence' && formData[key] !== 'Select your occupation' && formData[key] !== 'Select an option';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
            <div className="container mx-auto px-4 py-8">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-primary">
                        {currentQuestion === -1 ? displayedText : "Mobile Application Recommendation System"}
                    </h1>
                </motion.div>

                {currentQuestion === -1 ? (
                    typewriterDone && (
                        <motion.button
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setCurrentQuestion(0)}
                            className="mx-auto block nav-button bg-primary text-white"
                        >
                            Start Test
                        </motion.button>
                    )
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="question-card"
                    >
                        {questions.map((key, index) => (
                            index === currentQuestion && (
                                <div className='flex flex-col' key={key}>
                                    {key in example_values ? (
                                        <>
                                            <div className='grid grid-cols-1 px-10 my-5 py-5 h-auto w-full rounded-xl justify-center items-center shadow-lg bg-indigo-200'>
                                                <label className='uppercase text-indigo-800 font-bold text-center text-wrap'>
                                                    {questionTexts[key]}
                                                </label>
                                            </div>
                                            <div className='flex justify-center'>
                                                <select
                                                    name={key}
                                                    value={formData[key]}
                                                    onChange={handleYesNoChange}
                                                    className='w-auto h-min my-5 p-3 rounded-md border-none shadow-lg bg-indigo-200 text-indigo-800'
                                                >
                                                    {example_values[key].map(value => (
                                                        <option key={value} value={value}>{value}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='grid grid-cols-1 px-5 my-5 py-5 h-auto w-full rounded-xl justify-center items-center shadow-lg bg-indigo-200'>
                                                <label className='uppercase font-bold text-center text-indigo-800 '>
                                                    {questionTexts[key]}
                                                </label>
                                            </div>
                                            <div className='flex flex-row justify-center items-center my-5'>
                                                <label className='text-red-700 text-sm'>Lowest</label>
                                                {[1, 2, 3, 4, 5].map(value => (
                                                    <button
                                                        key={value}
                                                        onClick={handleClick}
                                                        name={key}
                                                        value={value}
                                                        type="button"
                                                        className={`w-12 h-12 mx-1 sm:mx-3 rounded-md text-l bg-indigo-100 hover:text-white hover:bg-indigo-500 ${getButtonClass(key,value) ? 'bg-indigo-600 text-white':''}`} 
                                                    >
                                                        {value}
                                                    </button>
                                                ))}
                                                <label className='text-green-700 text-sm ml-1' >Highest</label>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )
                        ))}
                        <div className='flex justify-center mt-5'>
                            {currentQuestion > 0 && <button className='w-40 h-10 rounded-md font-bold mr-10 border-indigo-400 border bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white' type="button" onClick={handleBack}>Back</button>}
                            {currentQuestion < questions.length - 1 ? (
                                <button className='w-40 h-10 rounded-md font-bold border-indigo-400 border bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white' type="button" onClick={handleNext}>Next</button>
                            ) : (
                                currentQuestion === questions.length-1 ? (
                                <button className='w-40 h-10 rounded-md font-bold border-indigo-400 border bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white' type="button" onClick={() => setCurrentQuestion(questions.length)}>Review</button>
                                ):''
                            )}
                        </div>
                    </motion.div>
                )}
                {currentQuestion >= 0 && currentQuestion < questions.length && (
                    <div className='grid grid-cols-6 justify-center mb-10 sm:grid-cols-12'>
                    {questions.map((key, index) => (
                        <button
                            key={index}
                            className={`font-bold w-10 m-2 h-10 rounded-md 
                                        ${isAnswered(key) && index !== currentQuestion ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-500'} 
                                        ${!isAnswered(key) && index !== currentQuestion ? 'bg-white text-indigo-500' : ''}`}
                            onClick={() => handleQuestionSelect(index)}
                            id={index === currentQuestion ? 'current' : ''}
                            type="button"
                        >
                            {index + 1}
                        </button>
                    ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index;
