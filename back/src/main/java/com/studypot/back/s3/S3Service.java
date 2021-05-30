package com.studypot.back.s3;

import com.amazonaws.services.s3.model.ObjectMetadata;
import java.io.InputStream;

public interface S3Service {

  String uploadFile(String fileName, InputStream inputStream, ObjectMetadata objectMetadata);

}
