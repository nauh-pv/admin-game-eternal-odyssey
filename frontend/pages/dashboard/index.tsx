import {
  Customers,
  Deals,
  Ratio,
  Revenue,
  Revenueanalytics,
  Sourcedata,
} from "@/shared/data/dashboards/crmdata";
import Seo from "@/shared/layout-components/seo/seo";
import Link from "next/link";
import React, { Fragment } from "react";

const DashBoard = () => {
  return (
    <Fragment>
      <Seo title={"Dashboard"} />
      <div className="md:flex block items-center justify-between my-[1.5rem] page-header-breadcrumb">
        <div>
          <p className="font-semibold text-[1.125rem] text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-0 ">
            Welcome back
          </p>
          <p className="font-normal text-[#8c9097] dark:text-white/50 text-[0.813rem]">
            Track in-game activity.
          </p>
        </div>
        <div className="btn-list md:mt-0 mt-2">
          <button
            type="button"
            className="ti-btn bg-primary text-white btn-wave !font-medium !me-[0.45rem] !ms-0 !text-[0.85rem] !rounded-[0.35rem] !py-[0.51rem] !px-[0.86rem] shadow-none"
          >
            <i className="ri-filter-3-fill  inline-block"></i>Filters
          </button>
          <button
            type="button"
            className="ti-btn ti-btn-outline-secondary btn-wave !font-medium  !me-[0.45rem]  !ms-0 !text-[0.85rem] !rounded-[0.35rem] !py-[0.51rem] !px-[0.86rem] shadow-none"
          >
            <i className="ri-upload-cloud-line  inline-block"></i>Export
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xxl:col-span-9 xl:col-span-12 col-span-12">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xxl:col-span-12  xl:col-span-12  col-span-12">
              <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-primary">
                            <i className="ti ti-users text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">
                                Total Figure
                              </p>
                              <h4 className="font-semibold  text-[1.5rem] !mb-2 ">
                                1,890
                              </h4>
                            </div>
                            <div id="crm-total-customers">
                              <Customers />
                            </div>
                          </div>
                          <div className="flex items-center justify-between !mt-1">
                            <div>
                              <Link
                                className="text-primary text-[0.813rem]"
                                href="#!"
                              >
                                View All
                                <i className="ti ti-arrow-narrow-right ms-2 font-semibold inline-block"></i>
                              </Link>
                            </div>
                            <div className="text-end">
                              <p className="mb-0 text-success text-[0.813rem] font-semibold">
                                +40%
                              </p>
                              <p className="text-[#8c9097] dark:text-white/50 opacity-[0.7] text-[0.6875rem]">
                                this month
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-secondary">
                            <i className="ti ti-wallet text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">
                                Total worlds
                              </p>
                              <h4 className="font-semibold text-[1.5rem] !mb-2 ">
                                562
                              </h4>
                            </div>
                            <div id="crm-total-revenue">
                              <Revenue />
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div>
                              <Link
                                className="text-secondary text-[0.813rem]"
                                href="#!"
                              >
                                View All
                                <i className="ti ti-arrow-narrow-right ms-2 font-semibold inline-block"></i>
                              </Link>
                            </div>
                            <div className="text-end">
                              <p className="mb-0 text-success text-[0.813rem] font-semibold">
                                +25%
                              </p>
                              <p className="text-[#8c9097] dark:text-white/50 opacity-[0.7] text-[0.6875rem]">
                                this month
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-success">
                            <i className="ti ti-wave-square text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">
                                Total item inventory
                              </p>
                              <h4 className="font-semibold text-[1.5rem] !mb-2 ">
                                12.287
                              </h4>
                            </div>
                            <div id="crm-conversion-ratio">
                              <Ratio />
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div>
                              <Link
                                className="text-success text-[0.813rem]"
                                href="#!"
                              >
                                View All
                                <i className="ti ti-arrow-narrow-right ms-2 font-semibold inline-block"></i>
                              </Link>
                            </div>
                            <div className="text-end">
                              <p className="mb-0 text-danger text-[0.813rem] font-semibold">
                                -12%
                              </p>
                              <p className="text-[#8c9097] dark:text-white/50 opacity-[0.7] text-[0.6875rem]">
                                this month
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-warning">
                            <i className="ti ti-briefcase text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">
                                Total realtime object
                              </p>
                              <h4 className="font-semibold text-[1.5rem] !mb-2 ">
                                7,543
                              </h4>
                            </div>
                            <div id="crm-total-deals">
                              <Deals />
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div>
                              <Link
                                className="text-warning text-[0.813rem]"
                                href="#!"
                              >
                                View All
                                <i className="ti ti-arrow-narrow-right ms-2 font-semibold inline-block"></i>
                              </Link>
                            </div>
                            <div className="text-end">
                              <p className="mb-0 text-success text-[0.813rem] font-semibold">
                                +19%
                              </p>
                              <p className="text-[#8c9097] dark:text-white/50  opacity-[0.7] text-[0.6875rem]">
                                this month
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
                  <div className="box">
                    <div className="box-header !gap-0 !m-0 justify-between">
                      <div className="box-title">Online Players</div>
                      <div className="hs-dropdown ti-dropdown">
                        <Link
                          href="#!"
                          className="text-[0.75rem] px-2 font-normal text-[#8c9097] dark:text-white/50"
                          aria-expanded="false"
                        >
                          View All
                          <i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                        </Link>
                        <ul
                          className="hs-dropdown-menu ti-dropdown-menu hidden"
                          role="menu"
                        >
                          <li>
                            <Link
                              className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                              href="#!"
                            >
                              Today
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                              href="#!"
                            >
                              This Week
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                              href="#!"
                            >
                              Last Week
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="box-body !py-5">
                      <div id="crm-revenue-analytics">
                        <Revenueanalytics />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xxl:col-span-3 xl:col-span-12 col-span-12">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xxl:col-span-12 xl:col-span-12  col-span-12">
              <div className="box">
                <div className="box-header justify-between">
                  <div className="box-title">Total Player</div>
                  <div className="hs-dropdown ti-dropdown">
                    <Link
                      aria-label="anchor"
                      href="#!"
                      className="flex items-center justify-center w-[1.75rem] h-[1.75rem] ! !text-[0.8rem] !py-1 !px-2 rounded-sm bg-light border-light shadow-none !font-medium"
                      aria-expanded="false"
                    >
                      <i className="fe fe-more-vertical text-[0.8rem]"></i>
                    </Link>
                    <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!"
                        >
                          Week
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!"
                        >
                          Month
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!"
                        >
                          Year
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="box-body overflow-hidden">
                  <div className="leads-source-chart flex items-center justify-center">
                    <Sourcedata />
                    <div className="lead-source-value ">
                      <span className="block text-[0.875rem] ">Total</span>
                      <span className="block text-[1.5625rem] font-bold">
                        4,044
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 border-t border-dashed dark:border-defaultborder/10">
                  <div className="col !p-0">
                    <div className="!ps-4 p-[0.95rem] text-center border-e border-dashed dark:border-defaultborder/10">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend mobile inline-block">
                        EU
                      </span>
                      <div>
                        <span className="text-[1rem]  font-semibold">
                          1,624
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col !p-0">
                    <div className="p-[0.95rem] text-center border-e border-dashed dark:border-defaultborder/10">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend desktop inline-block">
                        NA
                      </span>
                      <div>
                        <span className="text-[1rem]  font-semibold">
                          1,267
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col !p-0">
                    <div className="p-[0.95rem] text-center border-e border-dashed dark:border-defaultborder/10">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend laptop inline-block">
                        AS
                      </span>
                      <div>
                        <span className="text-[1rem]  font-semibold">
                          1,153
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
              <div className="box">
                <div className="box-header flex justify-between">
                  <div className="box-title">Top Worlds</div>
                  <div className="hs-dropdown ti-dropdown">
                    <Link
                      aria-label="anchor"
                      href="#!"
                      className="flex items-center justify-center w-[1.75rem] h-[1.75rem]  !text-[0.8rem] !py-1 !px-2 rounded-sm bg-light border-light shadow-none !font-medium"
                      aria-expanded="false"
                    >
                      <i className="fe fe-more-vertical text-[0.8rem]"></i>
                    </Link>
                    <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!"
                        >
                          Week
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!"
                        >
                          Month
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!"
                        >
                          Year
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="box-body">
                  <ul className="list-none crm-top-deals mb-0">
                    <li className="mb-[0.9rem]">
                      <div className="flex items-start flex-wrap">
                        <div className="me-2">
                          <span className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-warning  bg-warning/10 font-semibold">
                            DO
                          </span>
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold mb-[1.4px]  text-[0.813rem]">
                            Đồ án tốt nghiệp
                          </p>
                          <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">
                            doantotnghiep
                          </p>
                        </div>
                        <div className="font-semibold text-[0.9375rem] ">
                          1d:2h:54m
                        </div>
                      </div>
                    </li>
                    <li className="mb-[0.9rem]">
                      <div className="flex items-start flex-wrap">
                        <div className="me-2">
                          <span className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem] rounded-full text-red bg-red/10 font-semibold">
                            LG
                          </span>
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold mb-[1.4px]  text-[0.813rem]">
                            Legend World
                          </p>
                          <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">
                            legendworld
                          </p>
                        </div>
                        <div className="font-semibold text-[0.9375rem] ">
                          1d:2h:59m
                        </div>
                      </div>
                    </li>
                    <li className="mb-[0.9rem]">
                      <div className="flex items-start flex-wrap">
                        <div className="me-2">
                          <span className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem] rounded-full text-blue bg-blue/10 font-semibold">
                            PR
                          </span>
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold mb-[1.4px]  text-[0.813rem]">
                            Pro World
                          </p>
                          <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">
                            proworld
                          </p>
                        </div>
                        <div className="font-semibold text-[0.9375rem] ">
                          1d:5h:59m
                        </div>
                      </div>
                    </li>
                    <li className="mb-[0.9rem]">
                      <div className="flex items-start flex-wrap">
                        <div className="me-2">
                          <span className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem] rounded-full text-yellow bg-yellow/10 font-semibold">
                            NX
                          </span>
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold mb-[1.4px]  text-[0.813rem]">
                            Next World
                          </p>
                          <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">
                            nextworld
                          </p>
                        </div>
                        <div className="font-semibold text-[0.9375rem] ">
                          1d:6h:9m
                        </div>
                      </div>
                    </li>
                    <li className="mb-[0.9rem]">
                      <div className="flex items-start flex-wrap">
                        <div className="me-2">
                          <span className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem] rounded-full text-green bg-green/10 font-semibold">
                            HI
                          </span>
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold mb-[1.4px]  text-[0.813rem]">
                            HI
                          </p>
                          <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">
                            hiworld
                          </p>
                        </div>
                        <div className="font-semibold text-[0.9375rem] ">
                          1d:10h:59m
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

DashBoard.layout = "Contentlayout";
export default DashBoard;
