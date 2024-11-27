import React from 'react';
import { motion } from 'framer-motion';
import { questionTexts } from './constants';

interface ReviewSectionProps {
  questions: string[];
  formData: Record<string, any>;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onQuestionClick: (index: number) => void;
}

const ReviewSection = ({ questions, formData, onBack, onSubmit, onQuestionClick }: ReviewSectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">Review Your Answers</h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-6">
          {questions.map((key, index) => (
            <motion.div 
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onQuestionClick(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {questionTexts[key]}
                  </h3>
                  <p className="text-primary font-semibold">
                    {formData[key]}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 rounded-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg font-semibold bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ReviewSection;