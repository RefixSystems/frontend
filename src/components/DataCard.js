import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const DataCard = ({
  date,
  instituteName,
  centerName,
  state,
  servicesProvided,
  disabilities,
  minimumPercentage,
  male,
  female,
  website,
  handleCardDetails,
  genderEligibility,
  schemeName,
  implementedBy,
  domainDescription,
  eligibleDisabilities,
  percentageOfDisability,
  minAge,
  maxAge,
  incomeLimit,
  comments,
}) => {
  return (
    <Card className="mb-4 shadow mt-4 pointer" onClick={handleCardDetails}>
      <Card.Body>
        <Link onClick={handleCardDetails}><Card.Title className="mb-3 h4">{schemeName}</Card.Title></Link>

        <Card.Text className="mb-3">{servicesProvided}</Card.Text>

        <Card.Text>
          <strong>Gender:</strong> {genderEligibility}
        </Card.Text>
        <Card.Text>
          <strong>Scheme Name:</strong> {schemeName}
        </Card.Text>
        <Card.Text>
          <strong>Implemented By:</strong> {implementedBy}
        </Card.Text>
        <Card.Text>
          <strong>Domain Description:</strong> {domainDescription}
        </Card.Text>
        <Card.Text>
          <strong>Eligible Disabilities:</strong> {eligibleDisabilities}
        </Card.Text>
        <Card.Text>
          <strong>Percentage of Disability:</strong> {percentageOfDisability}
        </Card.Text>
        <Card.Text>
          <strong>Min Age:</strong> {minAge}
        </Card.Text>
        <Card.Text>
          <strong>Max Age:</strong> {maxAge}
        </Card.Text>
        <Card.Text>
          <strong>Income Limit:</strong> {incomeLimit}
        </Card.Text>
        <Card.Text>
          <strong>Comments: </strong>
          <a
            href={comments}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            {comments}
          </a>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DataCard;
