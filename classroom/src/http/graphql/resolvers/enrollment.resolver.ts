import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CoursesService } from '../../../services/course.service';
import { EnrollmentService } from '../../../services/enrollment.service';
import { StudentsService } from '../../../services/student.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Enrollment } from '../models/enrollment';

@Resolver(() => Enrollment)
export class EnrollmentResolver {
  constructor(
    private readonly enrollmentService: EnrollmentService,
    private readonly studentService: StudentsService,
    private readonly courseService: CoursesService,
  ) { }

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  enrollment() {
    return this.enrollmentService.listAllEnrollment();
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentService.getStudentById(enrollment.studentId);
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.courseService.getCourseById(enrollment.courseId);
  }
}
