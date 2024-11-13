'use client';
import React, { useEffect, useRef, useState } from 'react';

import { useBoothSelection } from '@/context/BoothSelectionContext';

interface BootSelectionTypeProps {
  floorPlanUrl: string;
  onChange?: (ids: string[]) => void; // Optional onChange callback
}

const BootSelection = (props: BootSelectionTypeProps) => {
  const { floorPlanUrl, onChange } = props;

  const [ids, setIds] = useState<string[]>([]);
  const { booths } = useBoothSelection();
  const svgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (floorPlanUrl) {
      fetchingSvg()
        .then((svg) => {
          if (svgRef.current) {
            svgRef.current.innerHTML = svg;

            const updatedSvg = svg.replace('<svg', '<svg width="100%" height="100vh"');
            svgRef.current.innerHTML = updatedSvg; // Attach event listeners to all rect elements

            const rects = svgRef.current.querySelectorAll('rect');

            rects.forEach((rect) => {
              const hoverClass = 'rect-hover';
              // Add hover effect
              const mouseEnterHandler = () => rect.classList.add(hoverClass);
              const mouseLeaveHandler = () => rect.classList.remove(hoverClass);
              const clickHandler = () => onClickBooth(rect);

              rect.addEventListener('mouseenter', mouseEnterHandler);
              rect.addEventListener('mouseleave', mouseLeaveHandler);
              rect.addEventListener('click', clickHandler);

              // Cleanup function for event listeners
              return () => {
                rect.removeEventListener('mouseenter', mouseEnterHandler);
                rect.removeEventListener('mouseleave', mouseLeaveHandler);
                rect.removeEventListener('click', clickHandler);
              };
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching SVG:', error);
        });
    }
  }, [floorPlanUrl, booths]); // Add onChange to the dependency array

  const onClickBooth = (rect: SVGRectElement) => {
    const rectId = rect.id; // Ensure rect.id is defined
    const booth = booths.find(({ boothNumber }) => boothNumber === rectId);
    if (!booth) {
      const message = `Booth with ID ${rectId} does not exist. Please verify and try again.`;
      alert(message);
      return;
    }
    const externalId = booth.externalId;

    rect.classList.toggle('checked');

    // Determine the new IDs without setting state yet
    setIds([externalId]);
  };

  function fetchingSvg() {
    return fetch(floorPlanUrl).then((res) => res.text());
  }

  useEffect(() => {
    // Emit the onChange event with the updated ids
    if (onChange) {
      onChange(ids);
    }
  }, [ids, onChange]);

  return <div ref={svgRef}></div>;
};

export default BootSelection;
