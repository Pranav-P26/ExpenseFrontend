import React from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

// Container for the entire graph
const GraphContainer = styled('div')({
  position: 'absolute',
  right: '5%',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '40%',
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
});

// Container for the bars
const BarContainer = styled('div')({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  height: '80%',
});

// Individual bar
const Bar = styled(motion.div)(({ theme }) => ({
  width: '8%',
  backgroundColor: theme.palette.primary.main,
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
}));

// Data point (circle on top of each bar)
const DataPoint = styled(motion.div)(({ theme }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.main,
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
}));

// Line connecting data points
const Line = styled(motion.div)(({ theme }) => ({
  height: '2px',
  backgroundColor: theme.palette.secondary.main,
  position: 'absolute',
  transformOrigin: 'left center',
}));

const GraphAnimation = () => {
  // Array of bar heights (as percentages)
  const barHeights = [20, 40, 30, 60, 50, 80, 70, 90];

  return (
    <GraphContainer>
      <BarContainer>
        {barHeights.map((height, index) => (
          <Bar
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          />
        ))}
      </BarContainer>
      {barHeights.map((height, index) => (
        <React.Fragment key={index}>
          <DataPoint
            style={{
              left: `${(index / (barHeights.length - 1)) * 100}%`,
              bottom: `${height}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
          />
          {index < barHeights.length - 1 && (
            <Line
              style={{
                left: `${(index / (barHeights.length - 1)) * 100}%`,
                bottom: `${height}%`,
                width: `${100 / (barHeights.length - 1)}%`,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            />
          )}
        </React.Fragment>
      ))}
    </GraphContainer>
  );
};

export default GraphAnimation;