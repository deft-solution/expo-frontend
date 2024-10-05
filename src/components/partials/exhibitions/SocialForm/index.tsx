import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { ISocials } from '@/schema/Exhibition';
import { InputText } from '@Core';

const ExhibitionSocialForm = () => {
  const name = 'socials';
  const { register, getValues } = useFormContext();
  const defaultValue = getValues(name);

  const [socials, setSocial] = useState<ISocials[]>(defaultValue);

  useEffect(() => {
    register(name);
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4">
        {socials.map((row, idx) => {
          return (
            <div key={idx}>
              <InputText
                name={`socials.${idx}.url`}
                label={row.type}
                placeholder="Ex: https://example.com/logos/techexpo2024.png"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExhibitionSocialForm;
