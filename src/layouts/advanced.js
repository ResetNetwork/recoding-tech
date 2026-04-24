// base imports
import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

// Material UI imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

// components
import components, { Layout } from "../components/index";
import SectionHero from "../components/SectionHero";
import SectionHeroTracker from "../components/SectionHeroTracker";
import Homepage from "../components/Homepage";

const Advanced = (props) => {
  const { path } = props;

  return (
    <Layout {...props} isHomepage>
      <Box>
        {path === "/" ? (
          <Homepage {...props} />
        ) : (
          <>
            {path === "/tracker" ? (
              <SectionHeroTracker {...props} />
            ) : (
              <SectionHero {...props} />
            )}
            <Container
              maxWidth={path === "search" ? "xl" : "lg"}
              style={{
                maxWidth: path === "search" ? "1415px!important" : "100%",
              }}
            >
              {_.map(
                _.get(props, "page.sections", null),
                (section, section_idx) => {
                  let component = _.upperFirst(
                    _.camelCase(_.get(section, "type", null))
                  );
                  let Component = components[component];
                  return (
                    <Component
                      key={section_idx}
                      {...props}
                      section={section}
                      site={props}
                    />
                  );
                }
              )}
            </Container>
          </>
        )}
      </Box>
    </Layout>
  );
};

Advanced.propTypes = {
  citations: PropTypes.array,
  path: PropTypes.string,
  page: PropTypes.object,
  featured: PropTypes.array,
  articles: PropTypes.array,
  fellows: PropTypes.array,
};

export default Advanced;
