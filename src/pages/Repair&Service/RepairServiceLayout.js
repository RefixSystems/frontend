
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import ReviewComponent from '../../components/ReviewComponent';
import { useGetServiceIssuesQuery } from '../../redux/api/Repair&ServiceApi';
import RepairService from './RepairService';
import { FaArrowLeft, FaMinus, FaPlus } from 'react-icons/fa';
import { useTheme } from '../../Contexts/ThemeContext';
import { useGetFaqParticularQuery } from '../../redux/api/FaqApi';
import CustomPagination from '../../components/CustomPagination';

export default function RepairServiceLayout() {
  const { color } = useTheme();
  const [allIssues, setAllIssues] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [devices, setDevices] = useState([]);
  const [currentFaqPage, setCurrentFaqPage] = useState(1);
  const [totalFaqPage, setTotalFaqPage] = useState();
  const [itemsPerFaqPage, setItemsPerFaqPage] = useState();
  const [totalItemsFaq, setTotalItemsFaq] = useState();
  const [faqData, setFaqData] = useState([]);
  const [isOpen, setIsOpen] = useState({});

  const { data: GetIssues, isLoading } = useGetServiceIssuesQuery();
  const { data: RepairFaqData } = useGetFaqParticularQuery({
    page: currentFaqPage,
    type: 'repair',
  });

  useEffect(() => {
    if (GetIssues && GetIssues.data) {
      setAllIssues(GetIssues?.data);
      setReviews(GetIssues?.reviews);
      setDevices(GetIssues?.quickServiceIssues[0].issues || []);
    }
  }, [GetIssues]);
  useEffect(() => {
    if (RepairFaqData && RepairFaqData.data) {
      setFaqData(RepairFaqData.data);
    }
    if (RepairFaqData && RepairFaqData.pagination) {
      setTotalFaqPage(RepairFaqData.pagination.totalPages);
      setItemsPerFaqPage(RepairFaqData.pagination.itemsPerPage);
      setTotalItemsFaq(RepairFaqData.pagination.totalItems);
    }
  }, [RepairFaqData, currentFaqPage]);

  const handlePageChangeFaq = (page) => {
    setCurrentFaqPage(page);
    window.scrollTo(0, 0);
  };
  const toggleFaq = (faqIndex) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [faqIndex]: !prevState[faqIndex],
    }));
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <Link
          to="/"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: color,
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <FaArrowLeft size={15} color="#fff" />
        </Link>
        <h4 className="text-center mt-4 flex-grow-1">
          <span className="main">“</span>Service Booking
          <span className="main">”</span>
        </h4>
      </div>

      <Container fluid>
        <RepairService
          IssueLoader={isLoading}
          allIssues={allIssues}
          devices={devices}
        />
        {reviews.length > 0 ? (
          <>
            {' '}
            <h4 className="text-center mt-4">What Our Client Are Saying</h4>
            {reviews.map((review) => (
              <ReviewComponent key={review._id} {...review} />
            ))}
          </>
        ) : (
          <></>
        )}

        <div className="my-5 w-100">
          <h4 className="text-center">FAQ - Repair & Service</h4>

          {faqData &&
            faqData.map((faq, faqIndex) => (
              <div key={faqIndex} className="mt-4">
                <div
                  key={faq._id}
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
                    onClick={() => toggleFaq(faqIndex)}
                    aria-expanded={isOpen[faqIndex]}
                  >
                    {isOpen[faqIndex] ? (
                      <FaMinus style={{ marginRight: '10px' }} />
                    ) : (
                      <FaPlus style={{ marginRight: '10px' }} />
                    )}
                    <span
                      className={`faq-question ${isOpen[faqIndex] ? 'open' : ''}`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  {isOpen[faqIndex] && (
                    <div
                      style={{
                        padding: '15px',
                        fontSize: '16px',
                        fontWeight: '400',
                      }}
                    >
                      <hr className="horizontal-line" />
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
        {faqData.length > 0 && totalFaqPage > 1 ? (
          <CustomPagination
            itemsPerPage={itemsPerFaqPage}
            totalItems={totalItemsFaq}
            currentPage={currentFaqPage}
            onPageChange={handlePageChangeFaq}
            totalPages={totalFaqPage}
          />
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
}
