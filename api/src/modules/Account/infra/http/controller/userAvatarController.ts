import UpdateUserPhotoService from '@modules/Account/services/updateUserAvatarService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import { container } from 'tsyringe';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const photo_filename = request.file.filename;

    const updateUserPhoto = container.resolve(UpdateUserPhotoService);

    const user = await updateUserPhoto.execute({
      user_id,
      photo_filename,
    });

    return response.json(classToClass(user));
  }
}
