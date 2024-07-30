import render from '@/utils/test/render';
import StoreCreateForm from '../stores/StoreCreateForm';
import { screen, within } from '@testing-library/dom';
import { mockUseLoginStore } from '@/utils/test/mockZustandStore';
import { server } from '../../../jest.setup';
import { rest } from 'msw';
import userInfo from '@/server/response/users.json';

const routerReplaceFn = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: routerReplaceFn,
    };
  },
}));

beforeEach(() => {
  mockUseLoginStore({ token: 'mock-accessToken' });
  server.use(
    rest.get('api/v1/users/me', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(userInfo));
    })
  );
});

jest.mock('../../components/stores/SearchAddress.tsx', () => {
  return function MockSearchAddress({ onSelectAddress, errorMessage, address }: any) {
    return (
      <div>
        <input
          type="text"
          placeholder="주소를 입력해주세요."
          readOnly
          value={address || ''}
          onClick={() => onSelectAddress('test-city')}
        />
        {errorMessage && <span>{errorMessage}</span>}
      </div>
    );
  };
});

it('제목을 입력하면 input value로 제목이 노출된다.', async () => {
  const { user } = await render(<StoreCreateForm />);
  const titleInput = screen.getByPlaceholderText('제목을 입력해주세요.');
  await user.type(titleInput, 'test-title');
  expect(titleInput).toHaveValue('test-title');
});

it('소개(description)을 입력하면 소개가 노출된다.', async () => {
  const { user } = await render(<StoreCreateForm />);
  const description = screen.getByPlaceholderText('소개를 작성해주세요!');
  await user.type(description, 'test-description');
  expect(description).toHaveValue('test-description');
});

describe('스토어 종류', () => {
  it('스토어 종류를 클릭하면 타입 선택을 위한 Bottom Modal과 종류들이 노출된다.', async () => {
    const { user } = await render(<StoreCreateForm />);
    const typeInput = screen.getByPlaceholderText('종류를 선택해주세요.');
    await user.click(typeInput);

    expect(screen.getByText('카페')).toBeInTheDocument();
    expect(screen.getByText('상점')).toBeInTheDocument();
    expect(screen.getByText('기타')).toBeInTheDocument();
  });

  it('종류중 카페를 선택하면 input value에 카페로 노출된다.', async () => {
    const { user } = await render(<StoreCreateForm />);
    const typeInput = screen.getByPlaceholderText('종류를 선택해주세요.');
    await user.click(typeInput);

    const cafeType = screen.getByText('카페');
    await user.click(cafeType);
    expect(typeInput).toHaveValue('카페');
  });
  it('종류중 상점을 선택하면 input value에 상점이 노출된다.', async () => {
    const { user } = await render(<StoreCreateForm />);
    const typeInput = screen.getByPlaceholderText('종류를 선택해주세요.');
    await user.click(typeInput);

    const cafeType = screen.getByText('상점');
    await user.click(cafeType);
    expect(typeInput).toHaveValue('상점');
  });
  it('종류중 기타를 선택하면 input value에 기타로 노출된다.', async () => {
    const { user } = await render(<StoreCreateForm />);
    const typeInput = screen.getByPlaceholderText('종류를 선택해주세요.');
    await user.click(typeInput);

    const cafeType = screen.getByText('기타');
    await user.click(cafeType);
    expect(typeInput).toHaveValue('기타');
  });
});

describe('주소 입력', () => {
  it('주소 입력 필드를 클릭하고 주소를 선택하면 input value에 선택한 값이 노출된다.', async () => {
    const { user } = await render(<StoreCreateForm />);
    const addressInput = screen.getByPlaceholderText('주소를 입력해주세요.');
    await user.click(addressInput);
    expect(addressInput).toHaveValue('test-city');
  });
});

describe('애완동물 가능 여부', () => {
  it('가능, 불가능 텍스트가 노출된다.', async () => {
    await render(<StoreCreateForm />);
    const possible = screen.getByText('가능');
    const impossible = screen.getByText('불가능');
    expect(possible).toBeInTheDocument();
    expect(impossible).toBeInTheDocument();
  });

  it('가능을 클릭하면 가능 라디오 버튼에 체크가 된다.', async () => {
    const { user } = await render(<StoreCreateForm />);
    const [possible, impossible] = screen.getAllByLabelText('petFriendOptionLi');
    await user.click(possible);
    expect(within(possible).getByTestId('inner-circle')).toBeInTheDocument();
    expect(within(impossible).queryByTestId('inner-circle')).not.toBeInTheDocument();
  });

  it('불가능을 클릭하면 불가능 라디오 버튼에 체크가 된다.', async () => {
    const { user } = await render(<StoreCreateForm />);
    const [possible, impossible] = screen.getAllByLabelText('petFriendOptionLi');
    await user.click(impossible);
    expect(within(impossible).getByTestId('inner-circle')).toBeInTheDocument();
    expect(within(possible).queryByTestId('inner-circle')).not.toBeInTheDocument();
  });
});

it('이미지를 업로드하면 업로드한 이미지가 노출된다.', async () => {
  const { user } = await render(<StoreCreateForm />);
  const uploadInput = screen.getByLabelText('upload-image');
  const file = new File(['dummy content'], 'example.png', { type: 'image/*' });
  await user.upload(uploadInput, file);
  const uploadedPhoto = await screen.findByAltText('Upload Image');
  expect(uploadedPhoto).toBeInTheDocument();
});

it('제목, 주소, 종류,  소개를 입력하지 않으면 폼 제출 버튼은 비활성화된다.', async () => {
  await render(<StoreCreateForm />);
  const submitButton = screen.getByText('게시');
  expect(submitButton).toBeDisabled();
});

it('제목, 주소, 종류, 소개를 입력하면 폼 제출할 수 있으며, router.replace("/")가 호출된다.', async () => {
  const { user } = await render(<StoreCreateForm />);
  const submitButton = screen.getByText('게시');
  const titleInput = screen.getByPlaceholderText('제목을 입력해주세요.');
  await user.type(titleInput, 'test-title');

  const description = screen.getByPlaceholderText('소개를 작성해주세요!');
  await user.type(description, 'test-description');

  const addressInput = screen.getByPlaceholderText('주소를 입력해주세요.');
  await user.click(addressInput);

  const typeInput = screen.getByPlaceholderText('종류를 선택해주세요.');
  await user.click(typeInput);

  const cafeType = screen.getByText('카페');
  await user.click(cafeType);

  expect(submitButton).not.toBeDisabled();
  await user.click(submitButton);
  expect(routerReplaceFn).toHaveBeenCalledWith('/');
});
