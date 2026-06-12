import { Message } from '../../models/Message';
import { User } from '../../models/User';

export function canEdit(
  message: Message | undefined,
  user: User | null | undefined,
) {
  return (
    (user &&
      message?.author.role === 'regular' &&
      ['moderator', 'admin'].includes(user.role)) ||
    (message?.author.role === 'moderator' && user?.role === 'admin') ||
    message?.author.id === user?.id
  );
}
