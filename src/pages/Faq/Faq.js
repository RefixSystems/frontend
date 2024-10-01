import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Paragraph from '../../components/paragraph';
import { HeadingWithQuotes } from '../../components/Heading';
import { useTheme } from '../../Contexts/ThemeContext';
import { useGetFaqQuery } from '../../redux/api/FaqApi';
import NoDataFound from '../../components/NoDataFound';
import FetchLoader from '../../components/FetchLoader';
const Faq = () => {
  const { color } = useTheme();
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState({});

  const toggleFaq = (sectionIndex, questionIndex) => {
    const key = `${sectionIndex}-${questionIndex}`;
    setIsOpen((prevOpen) => ({
      ...prevOpen,
      [key]: !prevOpen[key],
    }));
  };

  const { data: FaqData, isLoading } = useGetFaqQuery();

  useEffect(() => {
    if (FaqData && FaqData.data) {
      setData(FaqData.data);
    }
  }, [FaqData]);

  return (
    <div>
       {isLoading ? (
        <FetchLoader />
      ) : (
      <Container className="mt-5">
        <HeadingWithQuotes>FAQ (Frequently Asked Questions)</HeadingWithQuotes>
        {data.length > 0 ? (
          <>
            <Paragraph fontSize={'16px'} fontWeight={400}>
              <span className="main fs-5">W</span>elcome to Refix Systems FAQ
              section. Here you'll find answers to common questions about our
              laptop rental, repair, and refurbished laptop sales services.

              
            </Paragraph>

            <div className="mb-5">
              {data.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mt-4">
                  {section.subtitle && (
                    <h5 style={{ color: 'black' }}>{section.subtitle}</h5>
                  )}
                  {section.questions &&
                    section.questions.map((question, questionIndex) => {
                      const key = `${sectionIndex}-${questionIndex}`;
                      return (
                        <div
                          key={questionIndex}
                          style={{
                            marginBottom: '15px',
                            border: `1px solid ${color}`,
                            borderRadius: '8px',
                            backgroundColor: '#ECFEFF',
                          }}
                        >
                          <div
                            style={{
                              padding: '15px',
                              fontSize: '16px',
                              fontWeight: '600',
                              cursor: 'pointer',
                            }}
                            onClick={() =>
                              toggleFaq(sectionIndex, questionIndex)
                            }
                            aria-expanded={isOpen[key]}
                          >
                            {isOpen[key] ? (
                              <FaMinus style={{ marginRight: '10px' }} />
                            ) : (
                              <FaPlus style={{ marginRight: '10px' }} />
                            )}
                            <span
                              className={`faq-question ${isOpen[key] ? 'open' : ''}`}
                            >
                              {question.question}
                            </span>
                          </div>

                          {isOpen[key] && (
                            <div
                              style={{
                                padding: '15px',
                                fontSize: '16px',
                                fontWeight: '400',
                              }}
                            >
                              <hr className="horizontal-line" />
                              <p>{question.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </>
        ) : (
          <NoDataFound />
        )}
      </Container>
      )}
    </div>
  );
};

export default Faq;
