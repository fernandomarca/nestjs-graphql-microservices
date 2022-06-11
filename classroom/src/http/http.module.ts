import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloDriver,
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import path from 'path';
import { CourseResolver } from './graphql/resolvers/course.resolver';
import { StudentResolver } from './graphql/resolvers/student.resolver';
import { EnrollmentResolver } from './graphql/resolvers/enrollment.resolver';
import { CoursesService } from '../services/course.service';
import { EnrollmentService } from '../services/enrollment.service';
import { StudentsService } from '../services/student.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    //resolvers
    CourseResolver,
    StudentResolver,
    EnrollmentResolver,
    //services
    CoursesService,
    EnrollmentService,
    StudentsService,
  ],
  controllers: [],
})
export class HttpModule { }
