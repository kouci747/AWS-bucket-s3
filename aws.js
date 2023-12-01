const AWS = require('aws-sdk');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

// Configuration AWS
AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'eu-west-3',
});

// Création d'une instance S3
const s3 = new AWS.S3();

// Spécifiez le chemin du fichier que vous souhaitez télécharger
const filePath = 'C:/Users/HP/Downloads/LCDC.m4a';

// Spécifiez le nom du bucket S3 créé sur votre compte AWS
const bucketName = 'spotifybucketynov';

// Lire le fichier en tant que flux
const fileStream = fs.createReadStream(filePath);

// Paramètres pour l'upload
const uploadParams = {
  Bucket: bucketName,
  Key: 'demonstrationYNOV.m4a', // Nom du fichier sur S3
  Body: fileStream,
};

// Upload du fichier sur S3
s3.upload(uploadParams, (err, data) => {
  if (err) {
    console.error("Erreur lors de l'upload :", err);
  } else {
    console.log('Fichier uploadé avec succès. URL S3 :', data.Location);
  }
});
/*

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::spotifybucketynov/*"
        }
    ]
}

*/
