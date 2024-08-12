import { mockUseLoginStore } from '@/utils/test/mockZustandStore';
import { server } from '../../../jest.setup';
import { rest } from 'msw';
import userInfo from '@/server/response/users.json';

import UserInfo from '../mypage/UserInfo';
import render from '@/utils/test/render';
import { screen } from '@testing-library/dom';

beforeEach(() => {
  mockUseLoginStore({ token: 'mock-accessToken' });
  server.use(
    rest.get('api/v1/users/me', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(userInfo));
    })
  );
});

it('유저정보 이름 & 아바타 & 이메일을 올바르게 노출한다.', async () => {
  await render(<UserInfo />);
  const username = await screen.findByText(userInfo.name);
  const email = await screen.findByText(userInfo.email);

  expect(username).toBeInTheDocument();
  expect(email).toBeInTheDocument();

  if (userInfo.avatar) {
    const avatarUrl = await screen.findByTestId('avatar');
    expect(avatarUrl).toBeInTheDocument();
  } else {
    const avatarIcon = await screen.findByTestId('detail-person-icon');
    expect(avatarIcon).toBeInTheDocument();
  }
});
