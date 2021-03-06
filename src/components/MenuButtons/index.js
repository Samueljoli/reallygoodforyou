import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TypedSpan from './TypedSpan';
import { isMobile } from 'react-device-detect';

const HomeDiv = styled.div`
  position: absolute;
  color: black;
  font-family: 'Roboto Mono', monospace;
  font-size: 1.5em;
  top: 0;
  left: 0;
  margin: 30px;
`;

const WorkDiv = styled.div`
  position: absolute;
  color: black;
  font-size: 1.5em;
  font-family: 'Roboto Mono', monospace;
  top: 0;
  right: 0;
  margin: 30px;
`;

const AboutDiv = styled.div`
  position: absolute;
  color: black;
  font-size: 1.5em;
  font-family: 'Roboto Mono', monospace;
  bottom: 0;
  left: 0;
  margin: 30px;
`;

const ContactDiv = styled.div`
  position: absolute;
  font-size: 1.5em;
  color: black;
  font-family: 'Roboto Mono', monospace;
  bottom: 0;
  right: 0;
  margin: 30px;
`;

const LinkWrapper = styled(Link)`
  color: black;
`;

const MenuButtons = (props) => {
  const { location } = props;
  const isNotHome = location.pathname !== '/';

  if (isNotHome) {
    return (
      <div className="rgfy-menu-buttons">
        <HomeDiv>
          <LinkWrapper to="/">
            <TypedSpan
              string={`${!isMobile ? 'really.good.for.you' : 'r.g.f.y'}`}
            />
          </LinkWrapper>
        </HomeDiv>
        <WorkDiv>
          <LinkWrapper to="/projects">
            <TypedSpan
              string="projects"
            />
          </LinkWrapper>
        </WorkDiv>
        <AboutDiv>
          <LinkWrapper to="/about">
            <TypedSpan
              string="who.tf"
            />
          </LinkWrapper>
        </AboutDiv>
        <ContactDiv>
          <LinkWrapper to ="/contact">
            <TypedSpan
              string="hit.me"
            />
          </LinkWrapper>
        </ContactDiv>
      </div>
    );
  }

  return <div></div>;
};

export default MenuButtons;
