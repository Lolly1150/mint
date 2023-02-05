import { Accordion as GenericAccordion } from '@mintlify/components';
import { ReactNode, useContext } from 'react';

import AnalyticsContext from '@/analytics/AnalyticsContext';
import { ComponentIcon, getIconType } from '@/ui/Icon';
import { Event } from '@/enums/events';

function Accordion({
  title,
  description,
  defaultOpen = false,
  icon,
  iconType,
  children,
}: {
  title: string;
  description?: string;
  defaultOpen: boolean;
  icon?: ReactNode | string;
  iconType?: string;
  children: ReactNode;
}) {
  const analyticsMediator = useContext(AnalyticsContext);
  const trackOpen = analyticsMediator.createEventListener(Event.AccordionOpen);
  const trackClose = analyticsMediator.createEventListener(Event.AccordionClose);

  const onChange = (open: boolean) => {
    if (open) {
      trackOpen({ title });
    } else {
      trackClose({ title });
    }
  };

  const Icon =
    typeof icon === 'string' ? (
      <ComponentIcon icon={icon} iconType={getIconType(iconType)} className="w-4 h-4" />
    ) : (
      icon
    );

  return (
    <GenericAccordion
      title={title}
      description={description}
      defaultOpen={defaultOpen}
      onChange={onChange}
      icon={Icon}
    >
      {children}
    </GenericAccordion>
  );
}

export default Accordion;
