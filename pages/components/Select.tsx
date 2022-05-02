import { ChangeEvent, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useField } from 'formik';

type Option = {
  item: string,
  value: string
}

type SelectProps = {
  label: string,
  name: string,
  emptyFirst?: boolean,
  placeholder: string,
  options: string[],
  onChange?: (e: ChangeEvent) => void
}

export const Select = ({name, label, emptyFirst, placeholder, options, onChange}: SelectProps) => {
  const [, meta, helpers] = useField(name)
  const { value } = meta
  const { setValue } = helpers

  const onValueChange = (e: ChangeEvent) => {
    if (onChange) {
      onChange(e)
    }
    setValue(e)
  }

  return (
    <Listbox value={value} onChange={onValueChange}>
      <Listbox.Label>{label}</Listbox.Label>
        <Listbox.Button className="focus:outline-none relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="capitalize block truncate">
              {emptyFirst ?
                value ? value : "Todos"
                : value
              }
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
              {emptyFirst ?
              (<Listbox.Option
                value=""
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-green-100 text-green-900' : 'text-gray-900'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`capitalize block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                    Todos
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>)
           : "" }
             { options.map((option, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  value={option.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-green-100 text-green-900' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`capitalize block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.item}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
    </Listbox>
  )
}

export default Select
