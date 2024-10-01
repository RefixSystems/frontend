import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import laptop1 from '../../assests/images/laptopservice.webp';
import laptop2 from '../../assests/images/laptopbattery.webp';
import laptop3 from '../../assests/images/lpadaptor.webp';
import laptop4 from '../../assests/images/powercord.webp';
import laptop5 from '../../assests/images/lpScreen.webp';
import laptop6 from '../../assests/images/keyboard.webp';
import laptop7 from '../../assests/images/laptopMotherboard.webp';
import laptop8 from '../../assests/images/Dvd.webp';
import laptop9 from '../../assests/images/RAMlaptop.webp';
import laptop10 from '../../assests/images/laptopHDD.webp';
import laptop11 from '../../assests/images/laptopFan.webp';
import laptop12 from '../../assests/images/laptopHeadtink.webp';
import laptop13 from '../../assests/images/laptopBottomPanel.webp';
import laptop14 from '../../assests/images/laptopTouchpad.webp';
import laptop15 from '../../assests/images/LaptopWire.webp';
import laptop16 from '../../assests/images/laptopWifiCard.webp';
import laptop17 from '../../assests/images/laptopScreen.webp';
import { Heading, HeadingWithQuotes } from '../../components/Heading';

const LaptopService = ({ header }) => {
  const laptopService = [
    {
      id: 1,
      laptopname: 'Laptop Accessories',
      describe: `When you have brought your new Laptop, there are some of
                      the useful accessories that you must buy from us in order
                      to add life to your laptop. Accessories like Carrying
                      case, Chill mat, Privacy screen, and accessories that can
                      extend your battery life while you are on the go.`,
      image: laptop1,
    },
    {
      id: 2,
      laptopname: 'Laptop Battery',
      describe: `Laptop Battery is one of the most important things that everyone
                 keeps checking while working. If you are continuously
                 working on your laptop for hours, it is obvious that your
                 laptop battery would drain. For the laptop battery to last
                 for longer hours...`,
      image: laptop2,
    },
    {
      id: 3,
      laptopname: 'Laptop Adapter',
      describe: `Laptop Adapter is a must-buy connectivity that is very
                 important to keep your laptop charged. One can only feel
                 it redundant till the time the laptop battery is charged
                 to 10%. After that, the need to buy a laptop adapter
                 starts.`,
      image: laptop3,
    },
    {
      id: 4,
      laptopname: 'Laptop Power Cords',
      describe: `You are working on your Laptop from long hours and you find that it's time to charge it. Suddenly you see that your Laptop is not charging at all. What will you do? Well, there can be several reasons for this kind of problem. Before coming to any conclusion, you can bring your Laptop to us and we will help you to fix the problem.`,
      image: laptop4,
    },
    {
      id: 5,
      laptopname: 'Laptop Screen',
      describe: `Laptop screen is the main hardware that shows you the output of your work. You cannot afford to bear the faulty Laptop screen for a single day. Your entire work comes to hault when you find problems like broken Laptop screen, fluctuation screen, blurred screes or any other.`,
      image: laptop5,
    },
    {
      id: 6,
      laptopname: 'Laptop Keyboard',
      describe: `Laptops have become an essential thing these days. Lots of brands and models are available in the market. It is quite difficult to find the best laptop that can be used for either personal or professional or both the uses.`,
      image: laptop6,
    },
    {
      id: 7,
      laptopname: 'Laptop Motherboard',
      describe: `A motherboard is a complex system board usually present inside your Laptop. This board contains most of the smaller to larger components that are responsible for smooth working of your laptop. There are different types of Motherboards available in the Market. Our Laptop services center.`,
      image: laptop7,
    },
    {
      id: 8,
      laptopname: 'Laptop RAM',
      describe: `RAM is one of the important components of a Laptop. It holds equal importance as that of any hard disk drive. Like CPU, processors, operating system, and other components are important for smooth functioning of your laptop, RAM is equally important.`,
      image: laptop9,
    },
    {
      id: 9,
      laptopname: 'Laptop HDD',
      describe: `HDD or Hard Disk Drive is the primary store device of your Laptop. The biggest concern here is that it is non-removable. You cannot remove it. It comes pre-installed. When you are working on your Laptop and save data, the data goes to the hard disk of your laptop.`,
      image: laptop10,
    },
    {
      id: 10,
      laptopname: 'Laptop Fan',
      describe: `Different types of Laptop fans are available in the market today. The main function of these fans is to protect your Laptop from overheating. We do provide services that are related to service and replacement of these Laptop fans.`,
      image: laptop11,
    },
    {
      id: 11,
      laptopname: 'Laptop Bottom Panel',
      describe: `Laptop Bottom panel is one of the safest components that are installed in a laptop for your safety. In the absence of a Laptop bottom panel, there are higher chances of short circuit. Since we know, laptop is a compact electronic device that contains all of its technical and non-technical parts.`,
      image: laptop13,
    },
    {
      id: 12,
      laptopname: 'Laptop TouchPad/Palmrest',
      describe: `Laptop has become an important machine for both personal as well as business use. There is huge demands of laptops that are driven by the latest technology. More and more manufacturers are coming into the market.`,
      image: laptop14,
    },
    {
      id: 13,
      laptopname: 'Laptop Wifi Card',
      describe: `Most of the people upgrade Laptop to be in-line with the latest technology. Memory and storage space are the two important things that are mostly upgraded by the people who use Laptops on a regular basis.`,
      image: laptop16,
    },
  ];

  return (
    <div>
      <Container className="mt-5">
        {header ? (
          <Heading>{header}</Heading>
        ) : (
          <HeadingWithQuotes>Laptop Services</HeadingWithQuotes>
        )}
        <Row>
          {laptopService.map((service) => (
            <Col md={12} className="mb-3" key={service.id}>
              <Card>
                <Row className="m-4 align-items-center">
                  {service.id % 2 === 1 ? (
                    <>
                      <Col md={4}>
                        <img
                          alt="service-image"
                          variant="top"
                         
                          src={service.image}
                          style={{ maxWidth: '100%', height: 'auto' }}
                        />
                      </Col>
                      <Col md={8}  className="mt-3">
                        <Card.Title>{service.laptopname}</Card.Title>
                        <p className='text-start'>{service.describe}</p>
                      </Col>
                    </>
                  ) : (
                    <>
                       <Col md={8}  className="mt-3">
                        <Card.Title>{service.laptopname}</Card.Title>
                        <p className='text-start'>{service.describe}</p>
                      </Col>
                      <Col md={4}>
                        <img
                          alt="service-image"
                          variant="top"
                         
                          src={service.image}
                          style={{ maxWidth: '100%', height: 'auto' }}
                        />
                      </Col>
                    
                    </>
                  )}
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default LaptopService;
