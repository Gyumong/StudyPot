package com.studypot.back.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.io.InputStream;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class S3ServiceImpl implements S3Service {

  private final AmazonS3Client amazonS3Client;

  @Value("${cloud.aws.s3.bucket}")
  private String bucket;

  @Override
  public String uploadFile(String fileName, InputStream inputStream, ObjectMetadata objectMetadata) {
    amazonS3Client.putObject(
        new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
            .withCannedAcl(CannedAccessControlList.PublicRead)
    );

    return amazonS3Client.getUrl(bucket, fileName).toString();

  }

}
