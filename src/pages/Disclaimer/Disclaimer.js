import React from 'react';
import Paragraph from '../../components/paragraph';
import { Container } from 'react-bootstrap';
import { HeadingWithQuotes } from '../../components/Heading';
const Disclaimer = () => {
  return (
    <>
      <Container fluid className="mt-5">
        <HeadingWithQuotes>Disclaimer</HeadingWithQuotes>
        <Paragraph fontSize={'16px'} fontWeight={400} className="mt-4">
        <span className="main fs-5">T</span>he information contained in this site is not to be taken as a
          substitute for specific advice. Given the changing nature of laws and
          regulations, and the specific nature of their application, information
          contained herein should be used for guidance only.
        </Paragraph>

        <Paragraph fontSize={'16px'} fontWeight={400} className="mt-4">
          The information contained within this site is updated on a regular
          basis, however you should do your own research and make your own
          enquiries for more current and accurate information.
        </Paragraph>

        <Paragraph fontSize={'16px'} fontWeight={400} className="mt-4">
          Refix system gives no warranty and makes no representation as to the
          accuracy or sufficiency of any description or statement contained in
          this website and accepts no liability for any loss which may be
          suffered by any person who relies either wholly or in part upon the
          information presented. All information provided is subject to change
          without notice.
        </Paragraph>

        <Paragraph fontSize={'16px'} fontWeight={400} className="mt-4">
          Certain links in this site connect to external websites and/or servers
          maintained by third parties. Refix system takes no responsibility for
          the accuracy of any information contained in external sites.
        </Paragraph>
      </Container>
    </>
  );
};

export default Disclaimer;
