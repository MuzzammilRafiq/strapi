/**
 *
 * GenericInput
 * This is a temp file move it to the helper plugin when ready
 */

import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { NumberInput } from '@strapi/parts/NumberInput';
import { Textarea } from '@strapi/parts/Textarea';
import { TextInput } from '@strapi/parts/TextInput';
import { ToggleInput } from '@strapi/parts/ToggleInput';
import Hide from '@strapi/icons/Hide';
import Show from '@strapi/icons/Show';
import PropTypes from 'prop-types';

const GenericInput = ({
  autoComplete,
  customInputs,
  description,
  disabled,
  intlLabel,
  labelAction,
  error,
  name,
  onChange,
  placeholder,
  step,
  type,
  value,
  ...rest
}) => {
  const { formatMessage } = useIntl();
  const [showPassword, setShowPassword] = useState(false);

  const CustomInput = customInputs ? customInputs[type] : null;

  if (CustomInput) {
    return (
      <CustomInput
        {...rest}
        description={description}
        disabled={disabled}
        intlLabel={intlLabel}
        labelAction={labelAction}
        error={error}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    );
  }

  const label = intlLabel.id
    ? formatMessage(
        { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
        { ...intlLabel.values }
      )
    : name;

  const hint = description
    ? formatMessage(
        { id: description.id, defaultMessage: description.defaultMessage },
        { ...description.values }
      )
    : '';

  const formattedPlaceholder = placeholder
    ? formatMessage(
        { id: placeholder.id, defaultMessage: placeholder.defaultMessage },
        { ...placeholder.values }
      )
    : '';

  const errorMessage = error ? formatMessage({ id: error, defaultMessage: error }) : '';

  switch (type) {
    case 'bool': {
      return (
        <ToggleInput
          checked={value || false}
          disabled={disabled}
          hint={hint}
          label={label}
          labelAction={labelAction}
          name={name}
          offLabel={formatMessage({
            id: 'app.components.ToggleCheckbox.off-label',
            defaultMessage: 'Off',
          })}
          onLabel={formatMessage({
            id: 'app.components.ToggleCheckbox.on-label',
            defaultMessage: 'On',
          })}
          onChange={e => {
            onChange({ target: { name, value: e.target.checked } });
          }}
        />
      );
    }
    case 'number': {
      return (
        <NumberInput
          disabled={disabled}
          error={errorMessage}
          label={label}
          labelAction={labelAction}
          id={name}
          hint={hint}
          name={name}
          onValueChange={value => {
            onChange({ target: { name, value, type } });
          }}
          placeholder={formattedPlaceholder}
          step={step}
          value={value || undefined}
        />
      );
    }
    case 'email':
    case 'text':
    case 'string': {
      return (
        <TextInput
          autoComplete={autoComplete}
          disabled={disabled}
          error={errorMessage}
          label={label}
          labelAction={labelAction}
          id={name}
          hint={hint}
          name={name}
          onChange={onChange}
          placeholder={formattedPlaceholder}
          type={type}
          value={value || ''}
        />
      );
    }
    case 'password': {
      return (
        <TextInput
          autoComplete={autoComplete}
          disabled={disabled}
          error={errorMessage}
          endAction={
            <button
              aria-label={formatMessage({
                id: 'Auth.form.password.show-password',
                defaultMessage: 'Show password',
              })}
              onClick={() => {
                setShowPassword(prev => !prev);
              }}
              style={{
                border: 'none',
                padding: 0,
                background: 'transparent',
              }}
              type="button"
            >
              {showPassword ? <Show /> : <Hide />}
            </button>
          }
          label={label}
          labelAction={labelAction}
          id={name}
          hint={hint}
          name={name}
          onChange={onChange}
          placeholder={formattedPlaceholder}
          type={showPassword ? 'text' : 'password'}
          value={value || ''}
        />
      );
    }
    case 'textarea': {
      return (
        <Textarea
          disabled={disabled}
          error={errorMessage}
          label={label}
          labelAction={labelAction}
          id={name}
          hint={hint}
          name={name}
          onChange={onChange}
          placeholder={formattedPlaceholder}
          type={type}
          value={value || ''}
        >
          {value}
        </Textarea>
      );
    }
    default: {
      return <div>{type} is not supported</div>;
    }
  }
};

GenericInput.defaultProps = {
  autoComplete: undefined,
  customInputs: null,
  description: null,
  disabled: false,
  error: '',
  labelAction: undefined,
  placeholder: null,
  step: 1,
  value: '',
};

GenericInput.propTypes = {
  autoComplete: PropTypes.string,
  customInputs: PropTypes.object,
  description: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object,
  }),
  disabled: PropTypes.bool,
  error: PropTypes.string,
  intlLabel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object,
  }).isRequired,
  labelAction: PropTypes.element,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object,
  }),
  step: PropTypes.number,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
};

export default GenericInput;
