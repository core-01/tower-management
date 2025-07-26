import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { towerService } from '../services/api';
import toast from 'react-hot-toast';

const schema = yup.object({
  towerCode: yup.string().required('Tower code is required'),
  address: yup.string().required('Address is required'),
  type: yup
    .string()
    .oneOf(['Monopole', 'Lattice', 'Guyed', 'Stealth'])
    .required('Type is required'),
  status: yup
    .string()
    .oneOf(['Active', 'Inactive', 'Maintenance', 'Planned'])
    .required('Status is required'),
  coordinates: yup.object({
    latitude: yup.number().required('Latitude is required').min(-90).max(90),
    longitude: yup.number().required('Longitude is required').min(-180).max(180),
  }),
  description: yup.string().optional(),
  installationDate: yup.string().optional(),
  height: yup.number().positive().optional(),
  capacity: yup.number().positive().optional(),
});
type FormData = yup.InferType<typeof schema>;

export const TowerForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
    defaultValues: {
      type: 'Monopole',
      status: 'Active',
      coordinates: { latitude: 0, longitude: 0 },
    },
  });

  React.useEffect(() => {
    if (isEdit && id) {
      const mock = {
        towerCode: 'TWR-2024-001',
        address: '123 Tower Street, Tech City, TC 12345',
        type: 'Monopole' as const,
        status: 'Active' as const,
        coordinates: { latitude: 40.7128, longitude: -74.0060 },
        description: 'Primary communication tower serving downtown area',
        installationDate: '2023-06-15',
        height: 150,
        capacity: 12,
      };
      // set mock values
      setValue('towerCode', mock.towerCode);
      setValue('address', mock.address);
      setValue('type', mock.type);
      setValue('status', mock.status);
      setValue('coordinates.latitude', mock.coordinates.latitude);
      setValue('coordinates.longitude', mock.coordinates.longitude);
      setValue('description', mock.description);
      setValue('installationDate', mock.installationDate);
      setValue('height', mock.height);
      setValue('capacity', mock.capacity);
    }
  }, [isEdit, id, setValue]);

const onSubmit: SubmitHandler<FormData> = async (data) => {
  console.log("Form Submitted", data);

  // Flatten coordinates for backend
  const payload = {
    ...data,
    latitude: data.coordinates.latitude,
    longitude: data.coordinates.longitude,
  };
  delete (payload as any).coordinates;

  try {
    if (isEdit && id) {
      await towerService.updateTower(id, payload);
      toast.success('Tower updated successfully');
    } else {
      await towerService.createTower(payload);
      toast.success('Tower created successfully');
    }
    navigate('/towers');
  } catch {
    toast.error(isEdit ? 'Failed to update tower' : 'Failed to create tower');
  }
};


  // Extend native input/select/textarea props
  type FieldProps = React.InputHTMLAttributes<HTMLInputElement> &
    React.SelectHTMLAttributes<HTMLSelectElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>;

  const FormField: React.FC<{
    label: string;
    name: keyof FormData | `coordinates.${'latitude' | 'longitude'}`;
    type?: 'select' | 'textarea' | React.InputHTMLAttributes<HTMLInputElement>['type'];
    required?: boolean;
    options?: { value: string; label: string }[];
  } & FieldProps> = ({ label, name, type, required, options, ...props }) => {
    const fieldName = name as any;
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {type === 'select' ? (
          <select
            {...register(fieldName)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            {...props}
          >
            {options?.map(o => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            {...register(fieldName)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            {...props}
          />
        ) : (
          <input
            type={type || 'text'}
            {...register(fieldName)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            {...props}
          />
        )}

        {/* cast errors to any for dynamic keys */}
        {(errors as any)[fieldName] && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {(errors as any)[fieldName]?.message}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 py-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isEdit ? 'Edit Tower' : 'Add New Tower'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {isEdit
            ? 'Update tower information'
            : 'Enter tower details to add to your infrastructure'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card hover animation="bounce-in">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Tower Code" name="towerCode" required />
            <FormField
              label="Type"
              name="type"
              type="select"
              required
              options={[
                { value: 'Monopole', label: 'Monopole' },
                { value: 'Lattice', label: 'Lattice' },
                { value: 'Guyed', label: 'Guyed' },
                { value: 'Stealth', label: 'Stealth' },
              ]}
            />
            <div className="md:col-span-2">
              <FormField label="Address" name="address" required />
            </div>
            <FormField
              label="Status"
              name="status"
              type="select"
              required
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
                { value: 'Maintenance', label: 'Maintenance' },
                { value: 'Planned', label: 'Planned' },
              ]}
            />
            <FormField label="Installation Date" name="installationDate" type="date" />
          </div>
        </Card>

        <Card hover animation="slide-in-left">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Location Coordinates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Latitude"
              placeholder="Enter the latitude"
              name="coordinates.latitude"
              type="number"
              step="any"
              required
            />
            <FormField
              label="Longitude"
              placeholder="Enter the Longitude"
              name="coordinates.longitude"
              type="number"
              step="any"
              required
            />
          </div>
        </Card>

        <Card hover animation="slide-in-right">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Additional Details
          </h3>
          <div className="space-y-6">
            <FormField
              label="Description"
              name="description"
              type="textarea"
              placeholder="Tower description and notes"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Height (feet)" name="height" type="number" />
              <FormField label="Capacity (tenants)" name="capacity" type="number" />
            </div>
          </div>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => navigate('/towers')}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            {isEdit ? 'Update Tower' : 'Create Tower'}
          </Button>
        </div>
      </form>
    </div>
  );
};
