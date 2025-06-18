import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

type Question = {
  _id: string;
  title: string;
  link: string;
};

type Props = {
  questionsByCategory: Record<string, Question[]>;
};

export default function CollapsibleCategories({ questionsByCategory }: Props) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap', // Allow categories to wrap when there's no space
        gap: '20px', // Add some space between categories
      }}
    >
      {Object.entries(questionsByCategory).map(([category, questions]) => (
        <div
          key={category}
          style={{
            width: '250px', // Fixed width for each category
            border: '1px solid transparent',
            borderRadius: 4,
            padding: 1,
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            backgroundColor: 'transparent',
          }}
        >
          <h2
            onClick={() => toggleCategory(category)}
            style={{
              cursor: 'pointer',
              userSelect: 'none',
              marginBottom: 10,
              color: 'white',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {category}
            <span style={{ marginLeft: '8px' }}>
              {expandedCategories.has(category) ? (
                <MdExpandLess />
              ) : (
                <MdExpandMore />
              )}
            </span>
          </h2>
          {expandedCategories.has(category) && (
            <ul style={{ paddingLeft: 20 }}>
              {questions.map(q => (
                <li key={q._id}>
                  <a href={`/questions/${q._id}`} target="_blank" rel="noopener noreferrer">
                    {q.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
