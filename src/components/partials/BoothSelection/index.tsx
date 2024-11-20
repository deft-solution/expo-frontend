'use client';
import React, { useEffect, useRef, useState } from 'react';

import { useBoothSelection } from '@/context/BoothSelectionContext';

interface BootSelectionTypeProps {
  floorPlanUrl: string;
  onChange?: (ids: string[]) => void; // Passes an array of selected booth IDs
}

const BootSelection = (props: BootSelectionTypeProps) => {
  const { floorPlanUrl, onChange } = props;

  const [selectedIds, setSelectedIds] = useState<string[]>([]); // Track an array of selected booth IDs
  const { booths } = useBoothSelection(); // Get booth details from context
  const svgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (floorPlanUrl) {
      fetchSvg();
    }
  }, [floorPlanUrl]); // Re-fetch when the floor plan changes

  const fetchSvg = async () => {
    try {
      const svg = await fetchingSvg();
      if (svgRef.current) {
        const updatedSvg = svg.replace('<svg', '<svg width="100%" height="100vh"');
        svgRef.current.innerHTML = updatedSvg;

        const rects = svgRef.current.querySelectorAll('rect');
        rects.forEach((rect) => {
          const rectId = rect.id;

          const booth = booths.find(({ boothNumber }) => boothNumber === rectId);
          console.log(booth, rectId);

          if (booth) {
            const isSelected = selectedIds.includes(booth.externalId); // Check if the current booth is selected

            // Set initial checked state based on selectedIds
            if (isSelected) {
              rect.classList.add('checked');
            } else {
              rect.classList.remove('checked');
            }

            // Add `reserved` class if the booth is reserved
            if (booth.isReserved) {
              rect.classList.add('reserved'); // Add a CSS class to visually indicate it's reserved
            } else {
              // Add event listeners for hover and click if not reserved
              const hoverClass = 'rect-hover';
              const mouseEnterHandler = () => rect.classList.add(hoverClass);
              const mouseLeaveHandler = () => rect.classList.remove(hoverClass);
              const clickHandler = () => onClickBooth(rect);

              rect.addEventListener('mouseenter', mouseEnterHandler);
              rect.addEventListener('mouseleave', mouseLeaveHandler);
              rect.addEventListener('click', clickHandler);

              // Cleanup event listeners
              return () => {
                rect.removeEventListener('mouseenter', mouseEnterHandler);
                rect.removeEventListener('mouseleave', mouseLeaveHandler);
                rect.removeEventListener('click', clickHandler);
              };
            }
          }
        });
      }
    } catch (error) {
      console.error('Error fetching SVG:', error);
    }
  };

  const onClickBooth = (rect: SVGRectElement) => {
    const rectId = rect.id; // Get booth ID from the rect element
    const booth = booths.find(({ boothNumber }) => boothNumber === rectId);

    if (!booth) {
      alert(`Booth with ID ${rectId} does not exist. Please verify and try again.`);
      return;
    }

    if (booth.isReserved) {
      alert('This booth is reserved and cannot be selected.');
      return; // Prevent further action if the booth is reserved
    }

    const externalId = booth.externalId;

    // Remove 'checked' class from all other booths
    const rects = svgRef.current?.querySelectorAll('rect') || [];
    rects.forEach((r) => r.classList.remove('checked'));

    // Update the selectedIds array to only include the currently selected booth
    const newSelectedIds = [externalId];
    setSelectedIds(newSelectedIds); // Update the selected booth IDs

    // Add the 'checked' class to the clicked booth
    rect.classList.add('checked');

    // Emit the onChange event with the updated selectedIds array
    if (onChange) {
      onChange(newSelectedIds);
    }
  };

  const fetchingSvg = () => fetch(floorPlanUrl).then((res) => res.text());

  return <div ref={svgRef}></div>;
};

export default BootSelection;
