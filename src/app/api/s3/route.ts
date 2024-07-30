import { DeleteObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const Bucket = process.env.AMPLIFY_BUCKET;
const Region = process.env.AWS_REGION;

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function POST(req: Request, res: Response) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        {
          error: '업로드할 수 없습니다.',
          isSuccess: false,
        },
        {
          status: 400,
        }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const Body = Buffer.from(arrayBuffer);
    const fileName = `${uuidv4()}-${file.name}`;

    await s3.send(
      new PutObjectCommand({
        Bucket,
        Key: fileName,
        Body,
        ContentType: file.type,
      })
    );

    const imageUrl = `https://${Bucket}.s3.${Region}.amazonaws.com/${fileName}`;

    return NextResponse.json(
      {
        isSuccess: true,
        imageUrl,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: 'Server Error',
        isSuccess: false,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: Request, res: Response) {
  try {
    const { fileNames } = await req.json();

    if (!fileNames || !Array.isArray(fileNames) || fileNames.length === 0) {
      return NextResponse.json(
        {
          error: '존재하지 않는 파일입니다.',
          isSuccess: false,
        },
        {
          status: 400,
        }
      );
    }

    const objects = fileNames.map((url) => {
      const key = url.split('.com/')[1];
      return { Key: decodeURIComponent(key) };
    });

    await s3.send(
      new DeleteObjectsCommand({
        Bucket,
        Delete: {
          Objects: objects,
          Quiet: false,
        },
      })
    );

    return NextResponse.json(
      {
        isSuccess: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: '서버 장애가 발생하였습니다.',
        isSuccess: false,
      },
      {
        status: 500,
      }
    );
  }
}
