import React, { useEffect } from "react";
import PropTypes from "prop-types";

// Material UI imports
import Box from "@mui/material/Box";

function CarouselRow({
  items,
  slideIndex,
  onSlideIndexChange,
  visibleCount,
  getItemKey,
  renderItem,
  transitionMs,
  sx,
  trackSx,
}) {
  const n = items.length;
  const maxSlide = Math.max(0, n - visibleCount);

  useEffect(() => {
    if (slideIndex > maxSlide) {
      onSlideIndexChange(maxSlide);
    }
  }, [maxSlide, slideIndex, onSlideIndexChange]);

  if (!n) {
    return null;
  }

  return (
    <Box sx={{ overflow: "hidden", width: "100%", ...sx }}>
      <Box
        sx={{
          display: "flex",
          width: `${(n / visibleCount) * 100}%`,
          transform: `translateX(-${(slideIndex * 100) / n}%)`,
          transition: `transform ${transitionMs}ms ease`,
          overflow: "hidden",
          contain: "paint",
          ...trackSx,
        }}
      >
        {items.map((item, i) => (
          <Box
            key={getItemKey(item, i)}
            sx={{
              flex: `0 0 ${100 / n}%`,
              boxSizing: "border-box",
              pr: i < n - 1 ? "20px" : 0,
              minWidth: 0,
            }}
          >
            {renderItem(item, i)}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

CarouselRow.propTypes = {
  items: PropTypes.array.isRequired,
  slideIndex: PropTypes.number.isRequired,
  onSlideIndexChange: PropTypes.func.isRequired,
  visibleCount: PropTypes.number,
  getItemKey: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  transitionMs: PropTypes.number,
  sx: PropTypes.object,
  trackSx: PropTypes.object,
};

CarouselRow.defaultProps = {
  visibleCount: 3,
  transitionMs: 350,
  sx: undefined,
  trackSx: undefined,
};

export default CarouselRow;
