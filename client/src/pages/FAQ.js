import SideBar from '../components/SideBar'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Link } from 'react-router-dom'

const FAQ = () => {
  return (
    <div className="FAQ">
      <SideBar />
      <div className="faq-accordion-container">
        <h1>FAQ</h1>
        <Accordion
          className="faq-accordion"
          style={{ backgroundColor: '#646E59', color: 'white' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>What are macronutrients?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Macronutrients, or macros, are essential nutrients the body needs
              in large quantities to remain healthy. Macronutrients provide the
              body with energy, help prevent disease, and allow the body to
              function correctly. There are three main types of macronutrients:
              proteins, fats, and carbohydrates.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="faq-accordion"
          style={{ backgroundColor: '#646E59', color: 'white' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Why are macros important?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Each individual is different in their macronutrient and caloric
              needs. These needs are highly dependent upon myriad factors
              including but not limited to: age, sex, height, weight, activity
              level, etc. Deviating from this standard in excess or deficit can
              cause unwanted weight gain or weight loss.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="faq-accordion"
          style={{ backgroundColor: '#646E59', color: 'white' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>What do TDEE and REE mean?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              REE is an acronym for Resting Energy Expenditure. In a nutshell,
              it represents the approximate number of calories your body will
              burn when at rest ie: not moving, resting heart rate. When REE is
              muliplied by a coefficient relating to your activity levels, age,
              sex, height and weight, it produces the TDEE, or Total Daily
              Energy Expenditure. TDEE acts as a reasonable approximation of the
              number of calories your body needs to maintain its current weight
              without a change in exercise habits.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="faq-accordion"
          style={{ backgroundColor: '#646E59', color: 'white' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>How reliable is TDEE?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              TDEE stands as a reasonable approximation. Planning caloric intake
              based on TDEE can produce excellent results, but it is not the
              most accurate tool available. In a clinical setting there are a
              number of methods to more precisely determine metabolic rate. One
              such example is the RQ or respiratory quotient. Read more{' '}
              <Link to="https://www.vacumed.com/293.html">HERE</Link>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

export default FAQ
